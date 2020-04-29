const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:"); // update to match the domain to make the request from client side
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var username, password, timer; // configuration variables
const port = 8000;
const uri =
  "mongodb+srv://username:<password>@cluster0-oyxhr.mongodb.net/test?retryWrites=true&w=majority";

// this function gets the configuration variables from table Config
function getData() {
  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, db) => {
      if (err) console.log(err);
      var mydb = db.db("Email_Google");
      var info = mydb.collection("Config").find({}).toArray();

      info.then((result) => {
        result.map((docs) => {
          username = docs.email;
          password = docs.password;
          timer = docs.timer;
        });
      });
    }
  );
}
getData();

// Query data from mongodb and send
MongoClient.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) console.log(err);
    app.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });

    setTimeout(() => {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // use gmail smtp server, could be other hostnames
        secure: true, // use SSL, port 465
        auth: {
          user: `${username}`,
          pass: `${password}`,
        },
      });
      const mailContent = {
        from: `${username}`,
        to: "",
        subject: "",
        generateTextFormHTML: true,
        html: "",
        text: "",
      };
      var status = { status: "unsend" };
      var newstatus = { $set: { status: "send" } };

      // API send mail
      app.post("/sendEmail", () => {
        cron.schedule(`${timer}`, () => {
          console.log("Sending mail automatically");
          mydb = db.db("Email_Google");
          mydb
            .collection("Data")
            .find({})
            .toArray((err, docs) => {
              if (err) throw err;
              docs.map((data) => {
                if (data.status === "unsend") {
                  (mailContent.to = data.email),
                    (mailContent.html = data.content),
                    (mailContent.subject = data.subject);
                  mailContent.text = data.status;

                  // update status the mails have already been sent
                  mydb.collection("Data").updateOne(status, newstatus, () => {
                    console.log("emails sent has been marked.");
                  });
                  console.log(mailContent);
                }

                if (data.status === "unsend") {
                  transporter.sendMail(mailContent, (res, err) => {
                    res ? console.log(res) : console.log(err);
                  });
                }
              });
            });
        });
      });
    }, 1000); // set time 1 second to wait for the asynchronous getData() function
  }
);

module.exports = app;

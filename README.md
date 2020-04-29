# email-cron-job
A back-end tool for sending instantaneous and automatic email.

---
## Installation
1. Clones a repository to your computer: `git clone https://github.com/Quocanhtp/email-cron-job.git`
2. Enter folder: `cd email-cron-job `
3. Install dependencies: `npm install`

## Configuration
### Setting MongoDB configuration
1. Account

Enter folder: `cd API`

Replace the `username` and `<password>` with your MongoDB account informations:

`const uri ="mongodb+srv://username:<password>@cluster0-oyxhr.mongodb.net/test?retryWrites=true&w=majority";`

2. Database

Sign in to your MongoDB Atlas account, create your database name: `Email_Google`

After that, create 2 collections name: `Config` and `Data`

![Capture](https://user-images.githubusercontent.com/36063411/80594339-03dab080-8a4d-11ea-9ec6-df55a1071b83.PNG)

#### Config

In the `Config` collection, you can generate your informations, this includes your email account information, and a timer.

![1](https://user-images.githubusercontent.com/36063411/80595184-87e16800-8a4e-11ea-8f4d-42ec36faf0bb.PNG)

- Email field: your email
- Password field: your email password account
- Timer field: this string is used for schedule the time you want to send your email. For example, in the picture described above, the literal: `* * * * * *` means you want the server sends immediately your email. For more information, please visit the document of [node-cron](https://www.npmjs.com/package/node-cron) to schedule the time by yourself.

#### Data

In the `Data` collection, it is primitive that in this scenario, you must create your own list of person's email to which you want send.


![2](https://user-images.githubusercontent.com/36063411/80606355-6d16ef80-8a5e-11ea-9042-cfacc9688a76.PNG)

- Subject field: The title of email
- Email field: the email you want to send your content to
- Content field: any text
- Status field: `unsend` - this is default

#### This is only for test purpose, in another version of this project, I will include the API insert email data via a data form from a client interface, in which you do not have to insert manually in the database.

### Running the project
1. Open Terminal, and type `npm start`

2. When the server has already started, you need to use an API development tool to call the API `localhost:8000/sendEmail`. I recommend the Postman tool, you can download it from [here](https://www.postman.com/). Once you have installed Postman, type the API address and then click the send button to call the API to send email.

![5](https://user-images.githubusercontent.com/36063411/80610092-1fe94c80-8a63-11ea-8eb1-c8e9e9dd9e18.PNG)


I send email to myself, the result appears like this:


![4](https://user-images.githubusercontent.com/36063411/80610386-7fdff300-8a63-11ea-8f68-fdad305d6001.PNG)


![3](https://user-images.githubusercontent.com/36063411/80610516-a69e2980-8a63-11ea-8b72-bd107e0b4dd6.PNG)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)


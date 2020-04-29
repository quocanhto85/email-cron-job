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

- Enter folder: `cd API`

- Replace the `username` and `<password>` with your MongoDB account informations:

`const uri ="mongodb+srv://username:<password>@cluster0-oyxhr.mongodb.net/test?retryWrites=true&w=majority";`

2. Database

- Sign in your MongoDB Atlas account, create your database name: `Email_Google`

- After that, create 2 collections name: `Config` and `Data`

![Image description](link-to-image)

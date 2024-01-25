const express = require("express");
const mongoose = require("mongoose");
const dbSchema = require("./databaseSchema");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DB_URL;

app.use(express.json());
app.use(cors());

app.post(process.env.ENDPOINT, async (req, res) => {
  const { name, email, message } = req.body;
  var mailOptions = {
    from: 'iritik358@gmail.com',
    to: [email],
    subject: "hello",
    text: "hello",
  };
  var mailOptionsSender = {
    from: 'iritik358@gmail.com',
    to: 'iritik071@gmail.com',
    subject: 'USER CONTACTED',
    name : name,
    text: message
  };
  try {
    const userData = await dbSchema.create({ name, email, message });
    console.log(userData);
    var transporter = nodemailer.createTransport({
      host:'smtp.gmail.com' ,
      port: 587,
      secure: false,
      auth: {
        user: 'iritik358@gmail.com',
        pass: 'xjke rvva nskk howu',
      },
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        transporter.sendMail(mailOptionsSender, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + mailOptionsSender.text);
          }
        });
      }
    });
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req,res)=>{
  await res.send("Hello this is get request")
})

mongoose.connect(db).then(
  () => {
    app.listen(PORT, () => {
      console.log(mongoose.connection.readyState);
      console.log(`listening at ${PORT}`);
    });
  },
  (err) => {
    console.log("error");
  }
);

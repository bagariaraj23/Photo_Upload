const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connect } = require("http2");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
  .then(user => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successfully", user: user });
      } else {
        res.send({ message: "Password incorrect" });
      }
    } else {
      res.send({ message: "User not found. Please register." });
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

app.post("/signup", (req, res) => {
  const { fname, lname, email, password } = req.body;
  User.findOne({ email: email })
  .then(user => {
    if (user) {
      res.send({ message: "User is already registered" });
    } else {
      const newUser = new User({
        fname,
        lname,
        email,
        password,
      });
      return newUser.save();
    }
  })
  .then(() => {
    res.send({ message: "Account has been created!! Please Login" });
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

const start = async () => {
  try {
    await connectDB("mongodb+srv://bagariaraj23:bagariaraj23@cluster0.8ilylxc.mongodb.net/blinkit");
    app.listen(8000, console.log(`Server started on port 8000`));
  } catch (error) {
    console.log(error);
  }
};

start();
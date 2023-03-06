const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.port;
require("dotenv").config();
const path = require("path");
const MONGO_URI = process.env.MONGO_URI;
const uri = MONGO_URI;
// console.log(uri);
const fileupload = require("express-fileupload");
app.use(fileupload());
const bodyparser = require("body-parser");
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const UserModal = require("./modals/user");
// const connectdata = async () => {
//   mongoose.connect(uri);
// };
// connectdata();
// await
// mongoose.connect(uri, (e) => {
//   if (e) {
//     console.log("Connection Failed to Database");
//   } else {
//     console.log("Connected to Database");
//   }
// });
// };
mongoose.connect(uri);
app.get("/home", async (req, res) => {
  try {
    const users = await UserModal.find();
    // console.log(users);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
});
// app.get("/:username", (req, res) => {
//   console.log(req.params.username);
//   res.json({
//     message: "success",
//   });
// });
app.get("/picture/:postimg", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, `./media/${req.params.postimg}`));
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
app.post("/abcd", async (req, res) => {
  // console.log(req.body);
  try {
    const { file } = req.files;
    const { author, location, description } = req.body;

    file.mv("./media/" + file.name, async (e) => {
      if (e) {
        res.json({
          message: e,
        });
      } else {
        const filedata = new UserModal({
          file: file.name,
          author: author,
          location: location,
          description: description,
        });
        const responseData = await filedata.save();
        res.json({
          status: 200,
          responseData,
        });
      }
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
});
app.listen(port, () => {
  console.log(`port is listening at ${port}`);
});

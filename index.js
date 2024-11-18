const express = require("express");
const userDb = require("./connect");
const menuDb = require("./menuitem");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8001;

// parse jason data
app.use(bodyParser.json()); // ye data direct req.body mai send krta hai
// parse url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

/* routes  */
app.get("/", (req, res) => {
  res.send("Your server is created ");
});

app.post("/persone", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the persone data
    //create the new persone document useing the mongoose model
    // const newPersone =new userDb()
    // newPersone.firstName=data.firstName;
    // newPersone.lastName=data.lastName;
    // newPersone.email=data.email;
    // newPersone.password=data.password;
    // newPersone.age=data.age;
    // newPersone.phoneNumber=data.phoneNumber
    // upr wala kren ki need nahi hai niche wala kr lo data ko direct pass kr do
    const newPersone = new userDb(data);

    const result = await newPersone.save();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log("there something went wrong ", err);
    res.status(500).json({ error: "internal server error:" });
  }
});
app.get("/menu", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = menuDb(data);
    const result = await menuItem.save();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: "something went wrong!" });
    console.log(err);
  }
});
// find data
app.get("/persone", async (req, res) => {
  try {
    const data = await userDb.find();
    console.log(data);
    res.status(200).json({ data });
  } catch (err) {
    console.log("something went wrong ", err);
  }
});

app.get("/menu/:taste", async (req, res) => {
  try {
    const tastKesa = req.params.taste;
    if (tastKesa == "spicy" || tastKesa == "sour" || tastKesa == "sweet") {
      const response = await menuDb.find({ tase: tastKesa });
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Invalid Tase type !" });
  }
});
// server listen port

app.listen(PORT, () => console.log(`server is created on this port :${PORT}`));

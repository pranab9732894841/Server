require("dotenv").config();
const express = require("express");
const app = express()
const mongoose = require("mongoose");

//detabase conections
mongoose.connect(process.env.LOCAL_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());


const productsRouter = require("./routes/product");
const userRouter = require("./routes/users")

app.get("/", function (req, res) {
  res.send("hi sudeepa iam masage from home");
});

app.use("/api/products", productsRouter)
app.use("/api/users", userRouter)


app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

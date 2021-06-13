require("dotenv").config();
const express = require("express");
const app = express()
const mongoose = require("mongoose");

//detabase conections
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());


const productsRouter = require("./routes/product");


app.use("/api/products", productsRouter)



app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

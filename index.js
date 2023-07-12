const express = require("express");
const cors = require("cors");
require("dotenv").config();

const signupRouter = require("./routes/signup.Router");
const loginRouter = require("./routes/login.Router");
const productsRouter = require("./routes/products.Router");
const cartRouter = require("./routes/cart.Router");
const authMiddleware = require("./middlewares/authMiddleware");
const connection = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", productsRouter);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

// app.use(authMiddleware);

app.use("/cart", cartRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server has started on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

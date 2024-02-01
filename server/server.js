const app = require('./config/server');
const db = require("./config/database");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const errorHandler = require('./utils/errorHandler');


app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/address", addressRoutes);
app.use("/order", orderRoutes);
app.use(errorHandler);

const port = process.env.PORT;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});

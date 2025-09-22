const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 9000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "ecom-secret", resave: false, saveUninitialized: true })
);
app.set("view engine", "ejs");

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

app.get("/", (req, res) => {
  res.render("index", { products, cart: req.session.cart || [] });
});

app.post("/add-to-cart", (req, res) => {
  const product = products.find((p) => p.id == req.body.productId);
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(product);
  res.redirect("/");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const mongoose = require("mongoose");

// MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/stock_prices", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Stock model
const Stock = mongoose.model("Stock", {
  name: String,
  price: Number,
});

// an array of stock data
const initialStockData = [
  { name: "AAPL", price: 150.0 },
  { name: "GOOGL", price: 2700.0 },
  { name: "MSFT", price: 300.0 },
  { name: "AMZN", price: 3400.0 },
  { name: "TSLA", price: 700.0 },
];

// Insert the initial stock data into the database
Stock.insertMany(initialStockData)
  .then(() => {
    console.log("Initial stock data inserted successfully.");
  })
  .catch((err) => {
    console.error("Error inserting initial stock data:", err);
  });

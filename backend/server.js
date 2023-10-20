const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("./db");

const app = express();

// Enable CORS to allow requests from your frontend
app.use(cors());

// Connect to your MongoDB database (replace with your actual MongoDB connection string)
// mongoose.connect("mongodb://localhost:27017/stock_prices", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// MongoDB database when the app starts
async function start() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
start();

// schema for your stock data
const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
});

const Stock = mongoose.model("Stock", stockSchema);

// route to fetch stock prices
app.get("/api/stock-price/:stockName", async (req, res) => {
  const requestParams = { ...req.body, ...req.query, ...req.params };
  console.log("requestParams-------", requestParams);
  try {
    const stockName = req.params.stockName;
    // Query the database to get the price based on the stock symbol
    const stock = await Stock.findOne({ name: stockName });
    console.log("stock---", stock);

    if (stock) {
      // Simulate random stock price changes
      const newPrice = stock.price + (Math.random() - 0.5);
      stock.price = newPrice;
      await stock.save();
      res.json({ price: newPrice.toFixed(2) });
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (error) {
    console.error("Error fetching stock price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

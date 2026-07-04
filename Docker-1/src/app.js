import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/api/data", (req, res) => {
  res.json([
    { id: 1, name: "John", age: 22 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 28 },
  ]);
});

app.get("/api/user", (req, res) => {
  res.json([
    { id: 101, customer: "John", total: 1200 },
    { id: 102, customer: "Alice", total: 2500 },
    { id: 103, customer: "Bob", total: 800 },
  ]);
});

export default app;

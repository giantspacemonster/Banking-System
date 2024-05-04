require("dotenv").config();
const { MongoClient } = require("mongodb");
let db;

async function connectToDb() {
  const url = process.env.DB_URL;
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log("Connected to MongoDB at ", url.split("/")[3].split("?")[0]);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  console.log(result.current);
  return result.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };

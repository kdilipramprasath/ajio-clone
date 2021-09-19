// import fs from "fs";
// import path from "path";

import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local."
  );
}

let cached = global.mongo;
if (!cached) cached = global.mongo = {};

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const conn = {};
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        conn.client = client;
        return client.db();
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
}

export async function getDataFromMongoDB({ group, category, subCategory }) {
  let db;

  try {
    db = (await connectToDatabase()).db;
  } catch (err) {
    console.log("Error message: " + err.message);
    return;
  }

  const collection = db.collection(group);

  let data;
  try {
    if (!subCategory) {
      data = await collection.find({ category }).toArray();
    } else {
      data = await collection
        .find({ category, "sub-category": subCategory })
        .toArray();
    }
  } catch (err) {
    console.log("Error Message: On finding data: " + err.message);
    return;
  }

  return data;
}

export async function getProductDetails({ _id, group }) {
  let db;

  try {
    db = (await connectToDatabase()).db;
  } catch (err) {
    console.log("Error message: " + err.message);
    return;
  }

  let data;
  try {
    data = await db.collection(group).findOne({ _id });
  } catch (err) {
    console.log("Error Message: On finding data: " + err.message);
    return;
  }

  return data;
}

export async function getProductIds() {
  let db;
  try {
    db = (await connectToDatabase()).db;
  } catch (err) {
    console.log("Error message: " + err.message);
    return;
  }

  let data;
  try {
    data = await db
      .collection("men")
      .find({}, { projection: { _id: 1 } })
      .toArray();
  } catch (err) {
    console.log("Error Message: On finding data: " + err.message);
    return;
  }

  return data;
}

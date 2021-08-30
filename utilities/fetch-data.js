// import fs from "fs";
// import path from "path";

import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://ajio-clone:MGGqDEHx4EYbS*s@cluster0.7yaec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// export function buildDataPath() {
//   return path.join(process.cwd(), "data", "products-json", "products.json");
// }

// export function extractData(filePath) {
//   return JSON.parse(fs.readFileSync(filePath));
// }

// export default function fetchData() {
//   return extractData(buildDataPath());
// }

export async function getDataFromMongoDB(filter, sortOrder = "") {
  const group = filter.group;
  let sortBy = null;
  if (sortOrder === "price-low") {
    sortBy = { price: 1 };
  }

  const filterObj = {};

  Object.keys(filter).forEach((key) => {
    if (key === "group") {
      return;
    }

    filterObj[key] = filter[key];
  });

  console.log(filter);

  await client.connect();
  const db = client.db("ajio-clone"); //"ajio-clone"
  const collection = db.collection(group);
  const data = await collection.find(filterObj).sort(sortBy).toArray();

  client.close();
  return data;
}

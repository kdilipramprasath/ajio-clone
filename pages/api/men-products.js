import { getDataFromMongoDB } from "../../utilities/fetch-data";

async function menProducts(req, res) {
  if (req.method === "POST") {
    const data = await getDataFromMongoDB(req.body.filter, req.body.sortOrder);
    res.status(200).json({ data: data });
  }
}

export default menProducts;

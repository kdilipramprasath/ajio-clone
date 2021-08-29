import { getDataFromMongoDB } from "../../utilities/fetch-data";

async function menProducts(req, res) {
  if (req.method === "POST") {
    console.log(req.body.sortOrder);
    const data = await getDataFromMongoDB(req.body.filter, req.body.sortOrder);
    // console.log(data);
    res.status(200).json({ data: data });
  }
}

export default menProducts;

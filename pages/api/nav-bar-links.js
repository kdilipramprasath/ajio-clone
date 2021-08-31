import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "Links", "links.json");

function handler(req, res) {
  if (req.method === "GET") {
    const data = fs.readFileSync(filePath);
    res.status(200).json(data);
  }
}

export default handler;

// pages/api/blockscout-stats.js
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://eth.blockscout.com/api/v2/stats");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching from Blockscout:", error);
    res.status(500).json({ error: "Failed to fetch data from Blockscout" });
  }
}

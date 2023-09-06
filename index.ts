import express from "express";
import axios from "axios";
require("dotenv").config();

const app = express();
const PORT = 3003;

const NEWSAPI_ENDPOINT = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEWS_API;
console.log(API_KEY);
// Get this from newsapi.org after registering
const COUNTRY = "nz";
const PAGE_SIZE = 10;

app.get(
  "/news",
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await axios.get(NEWSAPI_ENDPOINT, {
        params: {
          country: COUNTRY,
          apiKey: API_KEY,
          pageSize: PAGE_SIZE,
        },
      });

      const headlines = response.data.articles.map(
        (article: any) => article.title
      );
      res.json(headlines);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).send("Failed to fetch news");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { scrapePage } from "../scrape";


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());


// Main route (Temp)
// @public
// returns product data
app.get("/", async (req, res) => {
    res.send(await scrapePage())
});

app.get("/:id", async (req, res) => {
    res.send(await scrapePage(req.params.id))
});
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started on port ${port}`));
import express from "express";
import axios from "axios";
import bodyParser from "body-parser"
import { compile } from "ejs";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})
const API_URL = "https://api.jikan.moe/v4";
app.post("/details", async (req, res) => {
    try {
        const response = await axios.get(API_URL + `/anime/${req.body.id}/full`);
        const data = response.data.data;
        const result = {
            name: data.title,
            synopsis: data.synopsis,
            imageURL: data.images.jpg.image_url,
            url: data.url,
            type: data.type,
            episodes: data.episodes,
            status: data.status,
            duration: data.duration,
            score: data.score,
            scored_by: data.scored_by,
            year: data.year,
        }
        res.render("home.ejs", result);
    } catch (error) {
        console.log('An error occured');
        res.sendStatus(500, { message: "An error occurred." });
    }
});
app.get("/random", async(req,res)=>{
    try {
        const response = await axios.get(API_URL + "/random/anime");
        const data = response.data.data;
        const result = {
            name: data.title,
            synopsis: data.synopsis,
            imageURL: data.images.jpg.image_url,
            url: data.url,
            type: data.type,
            episodes: data.episodes,
            status: data.status,
            duration: data.duration,
            score: data.score,
            scored_by: data.scored_by,
            year: data.year,
        }
        res.render("home.ejs", result);
    } catch (error) {
        console.log('An error occured');
        res.sendStatus(500, { message: "An error occurred." });
    }
});

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
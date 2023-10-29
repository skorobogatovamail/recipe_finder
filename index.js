import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const appId = "69aded04";
const appKey = "11750d7a7a9050851c7216c465aa60b1";
const basicURL = "https://api.edamam.com/api/recipes/v2";
const URL = `${basicURL}?type=public&app_id=${appId}&app_key=${appKey}`;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.post('/search', async (req, res) => {
    let query = req.body.query;
    if (query === "") query = "chicken";
    try {
        const result = await axios.get(`${URL}&q=${query}`);
        console.log(`${URL}&q=${query}`);
        console.log(result.data.hits);
        res.render('search.ejs', result.data);
    } catch (error) {
        console.log(error.response.data);
        res.render('search.ejs', {content: error.response});
    }
        
});

app.post('/show-recipe', (req, res) => {
    console.log(req);
    let recipeNumber = req.body.value;
    res.render('search.ejs', result.data);
});


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});






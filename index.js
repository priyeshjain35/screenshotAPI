const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public/screenshots'));

const dirName = path.join(__dirname);

app.use(
    bodyParser.urlencoded({
      extended: true
    })
)
  
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post('/screenshot', (req, res) => {
    console.log("from get method");
    
    (async () => {
        const url = req.body.searchUrl;
        console.log("from puppeteer screenshot async method");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const imageTitle = `img007-${new Date().getTime()}.png`;
        const imageUrl = `public/screenshots/${imageTitle}`;
        await page.screenshot({path: imageUrl, fullPage: true});
        await browser.close();
        console.log(dirName+ '/' +imageUrl);
        res.send({
            imageName: imageTitle,
            url: dirName+ '/' +imageUrl
        })
    })();
});

app.get("/screenshot", (req, res) => {
    const query = req.query
    console.log(Object.keys(query)[0]);
    (async () => {
        const url = Object.keys(query)[0];
        console.log("from puppeteer screenshot async method");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const imageTitle = `img007-${new Date().getTime()}.png`;
        const imageUrl = `public/screenshots/${imageTitle}`;
        await page.screenshot({path: imageUrl, fullPage: true});
        await browser.close();
        console.log(dirName+ '/' +imageUrl);
        // res.send({
        //     imageName: imageTitle,
        //     url: dirName+ '/' +imageUrl
        // })
        res.json({
            url: dirName+ '/' +imageUrl
        })
    })();
})

app.listen(7000, function() {
    console.log("Running on port 7000");
});

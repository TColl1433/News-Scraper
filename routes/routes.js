const cheerio = require('cheerio');
const axios = require('axios');


//setting up a function which references future arguments

module.exports = function (app) {
    //setting up a route on root URL
    app.get('/', (req, res) => {
        // when this route loads I want to get the html from the NPR news page
        axios.get('https://www.npr.org/sections/news')
            .then(res => {
                //then turn the html into a jquery like DOM
                //what is res.data? it is HTML
                const $ = cheerio.load(res.data);

                $('#featured h2 .title');

                //then searh the DOM usining jquery like features to find all the articles
            }).catch(err => console.log(err));




    });
};
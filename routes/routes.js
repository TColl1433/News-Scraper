const cheerio = require('cheerio');
const axios = require('axios');
// const mongodb = require('mongodb')


//setting up a function which references future arguments

module.exports = function (app, db) {

    //below are 2 methods, insert to create our stocks and find


    //methode 2 find
    //find all to array and it receives a callback of either an error or all of the items

    //setting up a route on root URL
    app.get('/', (req, res) => {
        // when this route loads I want to get the html from the NPR news page
        axios.get('https://finance.yahoo.com/most-active')
            // axios.get('http://www.npr.org/sections/news/archive')

            .then(response => {
                //then turn the html into a jquery like DOM
                //what is res.data? it is HTML
                const $ = cheerio.load(response.data);
                let stocks = []
                //All of the cells with aria label, array of all cells

                $('#fin-scr-res-table table tr').each((index, element) => {
                    // $('#div.archivelist > article').each((index, element) => {
                    //if all the table cells are in an array, the index is just going
                    //to represent the index number of the cells
                    //
                    const name = $(element).find('td[aria-label="Name"]').text();
                    const price = $(element).find('td[aria-label="Price (Intraday)"] span').text();
                    // const name = $(element).find('div.item-info h2.title').text();
                    let stock = {};

                    db.find({
                        name: name
                    }).toArray(function (err, results) {
                        if (err) throw err;

                        if (results.length) {
                            stock.favorited = true;

                        }
                        console.log(results);
                    });


                    if (name && price) {
                        stock.name = name;
                        stock.price = price;
                        stocks.push(stock);
                    }
                });

                res.render('index', { stocks: stocks })

                //then searh the DOM usining jquery like features to find all the articles
            }).catch(err => console.log(err));


        // console.log(stocks);
    });





    //sending data from frontend to backend is a post request
    app.post('/api/favorites', (req, res) => {

        //method: insert
        db.insertOne({
            name: req.body.name,
            price: req.body.price
        }, function (err, result) {
            if (err) return res.send('error');

            res.send('Stock added successfully');
        });
    });
}

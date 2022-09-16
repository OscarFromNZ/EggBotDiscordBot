const express = require("express");
const path = require("node:path");

module.exports = async (client) => {
    const app = await express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.get('/', function(req, res){
        res.render('index');
    });

    app.listen(3000);

    console.log("Website online, listening at http://localhost:3000/");
}
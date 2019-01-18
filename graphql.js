const { parse } = require('url');
const { graphql } = require("graphql");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
    .on('error', (error) => { console.warn('Warning', error); });
require('./src/graphql/models/models.js');
const schema = require("./src/graphql/schema.js");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    let variables = query['variables'] ? JSON.parse(query['variables']) : null;
    graphql(schema, query['query'], null, null, variables).then((response) => {
        console.log(response.errors);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: response.data}, null, 3));
    }).catch((error) => {
        console.log(error);
    });
};
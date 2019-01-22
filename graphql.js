const { parse } = require('url');
const { graphql } = require("graphql");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
    .on('error', (error) => { console.warn('Warning', error); });

// Load Mongoose models
require('./src/graphql/models/models.js');

const schema = require("./src/graphql/schema.js");

module.exports = async (req, res) => {
    const { query } = parse(req.url, true);
    let variables = query['variables'] ? JSON.parse(query['variables']) : null;

    let response = await graphql(schema, query['query'], null, null, variables);
    
    console.log(response.errors);
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: response.data}, null, 3));
};
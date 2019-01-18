const { parse } = require('url');
const { graphql } = require("graphql");

const schema = require("./src/graphql/schema.js");
const root = require("./src/graphql/root.js");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    let variables = query['variables'] ? JSON.parse(query['variables']) : null;
    graphql(schema, query['query'], root, null, variables).then((response) => {
        console.log(response.errors);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: response.data}, null, 3));
    }).catch((error) => {
        console.log(error);
    });
};
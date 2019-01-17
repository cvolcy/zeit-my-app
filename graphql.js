const { parse } = require('url');
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(require("./src/graphql/schema.js"));
const root = require("./src/graphql/root.js");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    let variables = JSON.parse(query['variables'] || '{}');
    graphql(schema, query['query'], root, null, variables).then((response) => {
        console.log(response.errors);
        console.log(response.data);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: response.data}, null, 3));
    }).catch((error) => {
        console.log(error);
    });
};
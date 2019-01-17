const { parse } = require('url');
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(require("./src/graphql/schema.js"));
const root = require("./src/graphql/root.js");

module.exports = (req, res) => {
    const { query } = parse(req.url, true);
    graphql(schema, query['query'], root, null, query['variables']).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: response.data}, null, 3));
    }).catch((error) => {
        console.log(error);
    });
};
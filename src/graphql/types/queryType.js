const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const VideoType = require("./videoType");
const BookType = require("./bookType");

var queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        videos: {
            type: new GraphQLList(VideoType),
            args: {
                lang: { type: GraphQLString, defaultValue: "en" }
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {
                lang: { type: GraphQLString, defaultValue: "en" }
            }
        }
    }
});

module.exports = queryType;
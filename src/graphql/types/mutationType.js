const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const VideoType = require("./videoType");
const VideoInputType = require("../inputs/videoInput");

var queryType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateVideo: {
            type: VideoType,
            args: {
                lang: { type: new GraphQLNonNull(GraphQLString) },
                input: { type: new GraphQLNonNull(VideoInputType) }
            }
        }
    }
});

module.exports = queryType;
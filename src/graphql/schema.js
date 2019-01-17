module.exports = `
    input VideoInput {
        _id: String!
        title: String
        description: String
        url: String
    }
    type Book {
        title: String
    }
    type Video {
        _id: String
        title: String,
        description: String,
        url: String
    }
    type Query {
        videos(lang: String = "en"): [Video!],
        books(lang: String = "en"): [Book!]
    }
    type Mutation {
        updateVideo(lang: String!, input: VideoInput!): Video
    }
`;
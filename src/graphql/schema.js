module.exports = `
    type Book {
        title: String
    }
    type Video {
        title: String,
        description: String,
        url: String
    }
    type Query {
        videos(lang: String = "en"): [Video!],
        books(lang: String = "en"): [Book!]
    }
`;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
    .on('error', (error) => { console.warn('Warning', error); });

require('./models/models.js');
const Videos = mongoose.model("Videos");
const Books = mongoose.model("Books");

module.exports = {
    videos: async ({ lang }) => {
        return (await Videos.find()).map((video) => video.localize(lang));
    },
    books: async ({ lang }) => {
        return (await Books.find()).map((book) => book.localize(lang));
    }
};
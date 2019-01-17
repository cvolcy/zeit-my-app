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
    updateVideo: async ({ lang, input }) => {
        const _id = input._id;
        let updates = {};

        if (input['title']) updates[`${lang}.title`] = input.title;
        if (input['description']) updates[`${lang}.description`] = input.description;
        if (input['url']) updates[`${lang}.url`] = input.url;

        return (await Videos.findOneAndUpdate({ _id }, { $set: updates}, {new: true}))
                    .localize(lang);
    },
    books: async ({ lang }) => {
        return (await Books.find()).map((book) => book.localize(lang));
    }
};
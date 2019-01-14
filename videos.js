const mongoose = require('mongoose');
const { parse } = require('url');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
    .on('error', (error) => { console.warn('Warning', error); });

let dataSchema = {
    title: String,
    description: String,
    url: String
};

let videosSchema = new mongoose.Schema({
    en: dataSchema,
    fr: dataSchema
}, { timestamps: true });

videosSchema.methods.localize = function(locale) {
    let locales = ['fr', 'en'];
    locales.push(locales.splice(locales.indexOf(locale), 1)[0]);
    
    let data = {_id: this._doc._id};
    
    for (let i = 0; i < locales.length; i++) {
        data = {...data, ...this._doc[locales[i]]}
    };
    
    return data;
};

mongoose.model('Videos', videosSchema);

module.exports = async (req, res) => {
    const { query } = parse(req.url, true);
    const { lang = "en" } = query;
    const Videos = mongoose.model("Videos");
    const count = await Videos.countDocuments();

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({videos: (await Videos.find()).map((video) => video.localize(lang)), count}, null, 3));
}
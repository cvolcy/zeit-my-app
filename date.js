module.exports = (req, res) => {
    res.end(`The date is ${Date.now()} : ${process.env.MY_EMAIL}`);
}
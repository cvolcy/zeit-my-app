module.exports = (req, res) => {
    let currentDate = new Date();

    const data = {
        timestamp: currentDate.getTime(),
        date: currentDate.toDateString(),
        time: currentDate.toTimeString(),
        timezoneOffset: currentDate.getTimezoneOffset(),
        name: process.env.MY_NAME,
        email: process.env.MY_EMAIL,
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, 3));
}
// конфигурация бд
module.exports = {
    url: 'mongodb://localhost:27017/books',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
};
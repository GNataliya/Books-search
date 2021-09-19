require('../bin/runners/db');
const axios = require('axios');
const articleModel = require('../models/article.js');

// const saveArticle = async (data) => {
//     const article = new articleModel;
//     article.name = data.articleTitle;
//     article.topic = data.topic;
//     article.text = data.text;
//     article.author = data.author; 
//     const articleNew = await article.save();
//     //console.log(articleNew)
// }

// найти все книги
const findAllBooks = async () => {
    const docs = await articleModel.find({ })
    .populate('author')
    .populate('genre');
    return docs;
};

// найти книгу по параметрам
const findBook = async (val) => {
    //const docs = await articleModel.find({ }).select(val);
    //const docs = await articleModel.find({ }, val );
    const docs = await articleModel.find({ name: val })
        .populate('author')
        .populate('genre');
    return docs;
};



module.exports = {
    //saveArticle,
    findAllBooks,
    findBook
};
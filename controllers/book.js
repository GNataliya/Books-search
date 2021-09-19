// require('../bin/runners/db');
// const axios = require('axios');
const bookModel = require('../models/article.js');

// добавить книгу
const addBook = async (name, author, genre) => {
        console.log(name, author, genre)
    try {
        const doc = await bookModel.create({name, author, genre});
        console.log('doc', doc)
        const { id } = doc;
        return { status: 'ok', payload: { id } }
    } 
    catch (err) {
        return { status: 'dublicate_name' };
    }
};



module.exports = {
    addBook
};
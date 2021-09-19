// require('../bin/runners/db');
// const axios = require('axios');
const genreModel = require('../models/genre.js');

// добавить имя жанра
const saveGenre = async (name) => {
    try {
        const doc = await genreModel.create({ name });
        //console.log('3', doc)      //отдает { _id: 613e236cb580d5cad0f97c75, name: 'comedy', __v: 0 }
        const { id } = doc;
        //console.log('4', id)       //отдает 613e236cb580d5cad0f97c75
        return { status: 'ok', payload: { id } }
    } catch (err) {
        return { status: 'dublicate_name' };
    }
};

//найти список всех жанров
const findGenres = async () => {
    const docs = await genreModel.find({ })
    //console.log(docs)
    return docs;
};

//найти жанр по имени
const getGenre = async (name) => {
    const docs = await genreModel.find({ name })
    //console.log(docs)
    return docs;
};


module.exports = {
    saveGenre,
    findGenres,
    getGenre
};
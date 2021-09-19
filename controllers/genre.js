const genreModel = require('../models/genre.js');

// добавить имя жанра
const saveGenre = async (name) => {
    try {
        const doc = await genreModel.create({ name });
        const { id } = doc;
        return { status: 'ok', payload: { id } }
    } catch (err) {
        return { status: 'dublicate_name' };
    }
};

//найти список всех жанров
const findGenres = async () => {
    const docs = await genreModel.find({ })
    return docs;
};

//найти жанр по имени
const getGenre = async (name) => {
    const docs = await genreModel.find({ name })
    return docs;
};


module.exports = {
    saveGenre,
    findGenres,
    getGenre
};

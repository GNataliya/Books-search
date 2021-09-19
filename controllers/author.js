
const authorModel = require('../models/user.js');

// добавить имя автора
const addAuthor = async (name) => {
    try {
        const doc = await authorModel.create({ name });
        const { id } = doc;
        return { status: 'ok', payload: { id } }
    } catch (err) {
        return { status: 'dublicate_name' };
    }
};

//найти список всех авторов
const findAuthors = async () => {
    const docs = await authorModel.find({ })
    return docs;
};

//найти автора по имени
const getAuthor = async (name) => {
    const docs = await authorModel.find({ name })
    return docs;
};



module.exports = {
    addAuthor,
    findAuthors,
    getAuthor
};

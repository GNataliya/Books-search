const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

require('./user');
require('./genre');

const generalSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        required: true,
        minlength: 1,
        maxlength:200,
        unique: true           // проверяет на наличие такой же инфо в БД, что б не дублировать
    },
    genre: [{
        type: Schema.Types.ObjectId, ref: 'genre',
    }],
    author: [{
        type: Schema.Types.ObjectId, ref: 'user',
        //type: Sсhema.Types.ObjectId, // указываем определенный id который указан в mongoose
        //ref: 'user',                 // author относится к коллекции users
    }],
    createDate: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

//const model = mongoose.model('article', generalSchema);
const modelname = path.basename(__filename, '.js');   // название модели совпадает с названием файла модели.
// получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // создаем модель
module.exports = model;

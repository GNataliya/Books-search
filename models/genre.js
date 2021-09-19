const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const generalSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        required: true,
        //enum: ['psyhology', 'busines', 'history', 'biographie', 'drama', 'fairy tale'],
        unique: true,
        minlength:2,
        maxlength:200
    },
});

//const model = mongoose.model('article', generalSchema);
const modelname = path.basename(__filename, '.js');   // название модели совпадает с названием файла модели.
// получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // создаем модель
module.exports = model;

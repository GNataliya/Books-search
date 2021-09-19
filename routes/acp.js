const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const Ajv = require("ajv");
const ajv = new Ajv();
const genreValidation = require('../routes/jsonSchemas/genreValid.js');
const authorValidation = require('../routes/jsonSchemas/authorValid.js');
const bookValidation = require('../routes/jsonSchemas/bookValid.js');

const createBook = require('../controllers/book.js');
const createAuthor = require('../controllers/author.js');
const createGenre = require('../controllers/genre.js');

//Показать стр. для добавления КНИГИ 
router.get('/book', (req, res) => {
    res.render('acp/book');        // если будут разные стр, ссылаемся на нужную 
});

// получаем авторов из БД
router.post('/authorList',  async (req, res) => {
    const getAuthor = await createAuthor.findAuthors();
    res.json(getAuthor);
});

// получаем жанры из БД
router.post('/genreList',  async (req, res) => {
    const getGenre = await createGenre.findGenres();
    res.json(getGenre);
});


//Роутер для аякса, для добавления КНИГИ
router.post('/book', upload.none(), async (req, res) => { 
     
    const { name } = req.body;
    const { selectAuthor } = req.body;
    const { selectGenre } = req.body;

    // const validate = ajv.compile(bookValidation.bookSchema);
    // const valid = validate(name);

    // if (!valid) {
    //     res.json({
    //         status: 'invalid data',
    //         payload: {
    //             error: validate.errors
    //         }
    //     });
    //     return;
    // };
    
    const searchAuthor = await createAuthor.getAuthor(selectAuthor);
    const author = searchAuthor.map(val=>val._id);

    const searchGenre = await createGenre.getGenre(selectGenre);
    const genre = searchGenre.map(val=>val._id);
    
    const result = await createBook.addBook(name, author, genre);
    //console.log('result', result)
    if (result.status === 'dublicate_name'){
        res.json({ status: 'dublicate_name' })
        return;
    } 
    
    res.json({ status: 'ok', payload: { id: result.payload.id } })
});


//Роутер для аякса, для добавления АВТОРА
router.post('/author', upload.none(), async (req, res) => { 
     
     const { name } = req.body;
    
    //  const validate = ajv.compile(authorValidation.authorSchema);
    //  const valid = validate(name);
 
    //  if (!valid) {
    //      res.json({
    //          status: 'invalid data',
    //          payload: {
    //              error: validate.errors
    //          }
    //      });
    //     return;
    //  };

     const result = await createAuthor.addAuthor(name);
                  
     if (result.status === 'dublicate_name'){
         res.json({ status: 'dublicate_name' })
         return;
     }  
     res.json({ status: 'ok', payload: { id: result.payload.id } })
});


//Роутер для аякса, для добавления ЖАНРА
router.post('/genre', upload.none(), async (req, res) => { 
    
    const { name } = req.body;
    
    // const validate = ajv.compile(genreValidation.genreSchema);
    // const valid = validate(name);

    // if (!valid) {
    //     res.json({
    //         status: 'invalid data',
    //         payload: {
    //             error: validate.errors
    //         }
    //     });
    //     return;
    // };

    const result = await createGenre.saveGenre(name);
    
    if (result.status === 'dublicate_name'){
        res.json({ status: 'dublicate_name' })
        return;
    } 
    res.json({ status: 'ok', payload: { id: result.payload.id } })
});



module.exports = router;

const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const createGenre = require('../controllers/genre.js');
const sendBooks = require('../controllers/findBooks.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main', {title: 'books' });
});

// получаем жанры из БД
router.post('/genreList',  async (req, res) => {
  const getGenre = await createGenre.findGenres();
  res.json(getGenre);
  //res.json({ status: 'ok' })
});

// отдаем все книги из БД на фронт
router.post('/server',  async (req, res) => { 
  const getData = await sendBooks.findAllBooks();
  //console.log(getData)
  res.json(getData);
});



// router.post('/form', upload.none(), async (req, res) => {
//   //console.log(req.body)
  
//   const articleNew  =  sendArticles.saveArticle(req.body);     //сохранение в базу работает!!!!!!!!!!!!

//   // const selectArticles = await sendArticles.selectName( 'name -_id' );
//   //console.log('names', selectArticles)

//   //res.json(selectArticles);
//   res.json(articleNew)
//   //res.json({ status: 'ok' });
// });


router.post('/find', upload.none(), async (req, res) => {
  console.log('req.body', req.body)

  const allBooks = await sendBooks.findAllBooks();
  //console.log('all books', allBooks)
 
  
  // const { articleTitle } = req.body;          // выводим имя для поиска из обьекта  
  // const titles = await sendBooks.findBook(articleTitle);
  // console.log(titles);                       // поиск документа (строки) по имени, работает !!!!!


  // const { authorBook } = req.body;      
  // const findAuthor = await sendBooks.findBook(authorBook);
  // console.log('author', ...findAuthor)

  // const { genreBook } = req.body;
  // const findGenre = await sendBooks.findBook(genreBook);
  // console.log('find genre', findGenre);   

  //res.json({ status: 'ok', })
  res.json(allBooks);
});


// router.post('/find/:author', upload.none(), async (req, res) => {
//   //console.log(req.body)
  
//   const { authorBook } = req.body;      
//   const findAuthor = await sendArticles.findInfoInArticle(authorBook);
//   console.log(findAuthor)

//   res.json(titles);
// });


module.exports = router;

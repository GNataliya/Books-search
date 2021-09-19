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
});

// отдаем все книги из БД на фронт
router.post('/server',  async (req, res) => { 
  const getData = await sendBooks.findAllBooks();
  res.json(getData);
});

// находим все книги и отдаем на фронт для фильтрации
router.post('/find', upload.none(), async (req, res) => {
  //console.log('req.body', req.body)
  const allBooks = await sendBooks.findAllBooks();
  res.json(allBooks);
});


module.exports = router;

//const cellResult = document.querySelector('.clientResult');      // div которій выводит список статей
//const cellResult = document.querySelector('.booksList'); 
//const createbtn =  document.querySelector('.create');            // кнопки
//const findbtn =  document.querySelector('.findArticle');
//const createForm =  document.querySelector('.createArticle');    // формы
//const findForm =  document.querySelector('.findArt');
const informBook =  document.querySelector('.informBook');
const informAuthor =  document.querySelector('.informAuthor');             // div с сообщениями пользователю
const informGenre =  document.querySelector('.informGenre');

const selectAuthor = document.querySelector('.selectAuthor');
const selectGenre = document.querySelector('.selectGenre');

// получаем данные авторов с бека
const authorList = async () => {
    const { data } = await axios.post('/acp/authorList');
    //console.log('list front', data)
    return data;
};

// создаем карточку автора и выводим на фронт
const renderAuthors = async () => {
    const authors = await authorList();
    //console.log(genres)
    const authorCard = authors.reduce((acc, item) => {
        //console.log(item)
        //acc += `<div>${item.name}  ${item.author[0].name}  ${item.price}</div>`
        acc += `<option>${item.name}</option>`
        return acc;
    }, '');
    //selectGenre.innerHTML = ganreCard;
    selectAuthor.insertAdjacentHTML('beforeend', authorCard);
};
renderAuthors();

// получаем данные жанры с бека
const genreList = async () => {
    const { data } = await axios.post('/acp/genreList');
    //console.log('list front', data)
    return data;
};

// создаем карточку и выводим на фронт
const renderGenres = async () => {
    const genres = await genreList();
    //console.log(genres)
    const ganreCard = genres.reduce((acc, item) => {
        //console.log(item)
        //acc += `<div>${item.name}  ${item.author[0].name}  ${item.price}</div>`
        acc += `<option>${item.name}</option>`
        return acc;
    }, '');
    //selectGenre.innerHTML = ganreCard;
    selectGenre.insertAdjacentHTML('beforeend', ganreCard);
};
renderGenres();

// форма создания книги
const bookEl = document.forms.addBook;
bookEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/book', formData);
    //console.log(data)
    informBook.classList.remove('hidden');  
});

// форма создания автора
const authorEl = document.forms.addAuthor;
authorEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/author', formData);
    //console.log(data)
    informAuthor.classList.remove('hidden');  
});

// форма создания жанров
const genreEl = document.forms.addGenre;
genreEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/genre', formData);
    //console.log(data)
    informGenre.classList.remove('hidden');  
});

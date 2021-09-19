const informBook =  document.querySelector('.informBook');
const informAuthor =  document.querySelector('.informAuthor');             
const informGenre =  document.querySelector('.informGenre');

const selectAuthor = document.querySelector('.selectAuthor');
const selectGenre = document.querySelector('.selectGenre');

// получаем данные авторов с бека
const authorList = async () => {
    const { data } = await axios.post('/acp/authorList');
    return data;
};

// создаем карточку автора и выводим на фронт
const renderAuthors = async () => {
    const authors = await authorList();
    const authorCard = authors.reduce((acc, item) => {
        acc += `<option>${item.name}</option>`
        return acc;
    }, '');
    selectAuthor.insertAdjacentHTML('beforeend', authorCard);
};
renderAuthors();

// получаем данные жанры с бека
const genreList = async () => {
    const { data } = await axios.post('/acp/genreList');
    return data;
};

// создаем карточку и выводим на фронт
const renderGenres = async () => {
    const genres = await genreList();
    const ganreCard = genres.reduce((acc, item) => {
        acc += `<option>${item.name}</option>`
        return acc;
    }, '');
    selectGenre.insertAdjacentHTML('beforeend', ganreCard);
};
renderGenres();

// форма создания книги
const bookEl = document.forms.addBook;
bookEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/book', formData);
    informBook.classList.remove('hidden');  
});

// форма создания автора
const authorEl = document.forms.addAuthor;
authorEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/author', formData);
    informAuthor.classList.remove('hidden');  
});

// форма создания жанров
const genreEl = document.forms.addGenre;
genreEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/genre', formData);
    informGenre.classList.remove('hidden');  
});

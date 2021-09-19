//const cellResult = document.querySelector('.clientResult');      // div которій выводит список статей
const cellResult = document.querySelector('.booksList'); 
//const createbtn =  document.querySelector('.create');            // кнопки
//const findbtn =  document.querySelector('.findArticle');
//const createForm =  document.querySelector('.createArticle');    // формы
const findForm =  document.querySelector('.findArt');
const genresList = document.querySelector('.genreBook');
//const informEl =  document.querySelector('.inform');             // div с сообщениями пользователю
const findFormEl =  document.querySelector('.findInform');

// генерим карточку для отображения таблицы
const card = (arr) => {
    
    const booksCard = arr.reduce((acc, item) => {

        const author = item.author.map(val=>val.name);
        const genre = item.genre.map(val=>val.name);
        
        acc += `<tr><td>${item.name}</td><td>${author}</td><td>${genre}</td></tr>`
        return acc;
    }, '');
    return booksCard
};

// получаем список всех книг
const getBooks = async () => {
    const { data } = await axios.post('/server');
    //console.log(data)
    return data;
};

// выводим список книг на страницу
const renderBooks = async () => {
    const books = await getBooks();
    //console.log('список книг', books)
    
    
    // const booksCard = books.reduce((acc, item) => {
    //     //console.log('item', item)

    //     const author = item.author.map(val=>val.name);
    //     const genre = item.genre.map(val=>val.name);

    //     //acc += `<div>${item.name}  ${item.author[0].name}  ${item.price}</div>`
    //     acc += `<tr class="row"><td>${item.name}</td><td>${author}</td><td>${genre}</td></tr>`
    //     return acc;
    // }, '');

    //cellResult.insertAdjacentHTML('beforeend', booksCard);
    cellResult.insertAdjacentHTML('beforeend', card(books));
};
renderBooks();


// получаем данные жанры с бека
const genreList = async () => {
    const { data } = await axios.post('/genreList');
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
    genresList.insertAdjacentHTML('beforeend', ganreCard);
};
renderGenres();


// findbtn.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     findForm.classList.remove('hidden');
// })


const findnameform = document.forms.findInfo;
findnameform.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const book = formData.get('articleTitle');
    const author = formData.get('authorBook');
    const genre = formData.get('genreBook');

    const { data } = await axios.post('/find', formData);
    //console.log('front', data)
    //console.log('author', author)

    cellResult.innerHTML ='';


    const findBook = data.filter((doc) => {
        const authordb = doc.author.map(val=>val.name);
        const genredb = doc.genre.map(val=>val.name);
        return (doc.name.includes(book) || authordb.includes(author) || genredb.includes(genre))
    })
    console.log(findBook)
    //cellResult.innerHTML = card(findBook);
    cellResult.insertAdjacentHTML('beforeend', card(findBook))
    

    // const findName = data.filter((doc) => {
    //     return (doc.name.includes(book))
    // })
    // console.log(findName)
    //cellResult.innerHTML = card(findName);
    //cellResult.insertAdjacentHTML('beforeend', card(findName))


    // const findAuthor = data.filter((doc) => {
    //     const authordb = doc.author.map(val=>val.name);
    //     return (authordb.includes(author))
    // })
    // console.log(findAuthor)
    //cellResult.innerHTML = card(findAuthor);
    //cellResult.insertAdjacentHTML('beforeend', card(findAuthor))


    // const findGenre = data.filter((doc) => {
    //     const genredb = doc.genre.map(val=>val.name);
    //     return (genredb.includes(genre))
    // })
    // console.log(findBook)
    //cellResult.innerHTML = card(findGenre);
    //cellResult.insertAdjacentHTML('beforeend', card(findGenre))





    // const renderList = async () => {
    //     //const books = await getBooks();
    //     //console.log('список книг', books)
    //     const findList = findBook.reduce((acc, item) => {
    //         //console.log('item', item)
    //         const author = item.author.map(val=>val.name);
    //         const genre = item.genre.map(val=>val.name);         
    //         //acc += `<div>${item.name}  ${item.author[0].name}  ${item.price}</div>`
    //         acc += `<tr class="row"><td>${item.name}</td><td>${author}</td><td>${genre}</td></tr>`
    //         return acc;
    //     }, '');
    //     cellResult.innerHTML = findList;
    //     //cellResult.insertAdjacentHTML('beforeend', findList);
    // };
    // renderList();

    //findForm.classList.add('hidden');
    // const html =`<p>${data[0].name}</p>`    // выведет имя
   
    //const html =`<div>${data[0].name}   ${data[0].author[0].name}  ${data[0].price}</div>`      // отдает текст статьи
    //const html =`<div>${data[0].name}   ${data[0].author[0].name},${data[0].author[1].name}   ${data[0].price}</div>`      // отдает текст статьи
    //findFormEl.innerHTML = html;

    //findFormEl.classList.remove('hidden');
    //cellResult.classList.add('hidden')
});


// const findnameform = document.forms.findInfo;
// findnameform.addEventListener('submit', async (ev) => {
//     ev.preventDefault();
//     const formData = new FormData(ev.target);
//     const { data } = await axios.post('/find', formData);
//     console.log(data)

//     //findForm.classList.add('hidden');
//     // const html =`<p>${data[0].name}</p>`    // выведет имя
   
//     const html =`<div>${data[0].name}   ${data[0].author[0].name}  ${data[0].price}</div>`      // отдает текст статьи
//     //const html =`<div>${data[0].name}   ${data[0].author[0].name},${data[0].author[1].name}   ${data[0].price}</div>`      // отдает текст статьи
//     findFormEl.innerHTML = html;

//     findFormEl.classList.remove('hidden');
//     cellResult.classList.add('hidden')
// });


// createbtn.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     createForm.classList.remove('hidden');
// });


// const formEl = document.forms.setInfo;
// formEl.addEventListener('submit', async (ev) => {
//     ev.preventDefault();
//     const formData = new FormData(ev.target);
//     const { data } = await axios.post('/form', formData);
//     //console.log(data)
//     createForm.classList.add('hidden');
//     informEl.classList.remove('hidden');  
// });
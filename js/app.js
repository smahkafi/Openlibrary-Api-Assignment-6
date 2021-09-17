
    // add Evenlistener part 
const bookContainer = document.getElementById('book-container')
var bookDetails = document.getElementById('book-details')
document.getElementById('search-btn').addEventListener('click', () => {
    bookContainer.innerHTML = `
    <div class= "w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    const searchText = document.getElementById('search-text');

    // error handeling
    if(searchText.value === ''){
        alert("You do not search blank value")
    }
    else{
        const api = `https://openlibrary.org/search.json?q=${searchText.value}`
        searchText.value = '';
        fetch(api)
        .then(res => res.json())
        .then(data => showData(data.docs))
    }
})

const showData = (books) => {
    let resultArraay = books.filter(one => one.cover_i !== undefined && one.author_name !== undefined && one.publisher !== undefined && one.title !== one.first_publish_year !== undefined)
if (resultArraay.length == 0) {
    bookDetails.innerHTML = ''
    // if blank search get this error 
    bookContainer.innerHTML = 'Opps! Sorry, No result is here. Please type right book name.'
    }
    else{
    let showTotalBook = document.createElement('p')
    showTotalBook.innerHTML = `You got ${resultArraay.length} books`
    bookDetails.innerHTML = ''
    bookDetails.appendChild(showTotalBook)
    bookContainer.innerHTML = ''
    resultArraay.forEach(book => {
        // create a new div for show books by card view 
        const newDiv= document.createElement('div')
        newDiv.innerHTML = `
        <div class="card my-3" style="width: 18rem;height:auto">
            <img class = "card-img-top img-fluid" style="width: 100%;height: 200px;" src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'
            <div class = "card-body">
                <h5 class= "card-title">Book Name: ${book.title}</h5>
                <p class = "card-subtitle text-success mb-2">Author Name: ${book.author_name[0]}</p>
                <p class = "card-text text-primary">Publisher: ${book.publisher[0]}</p>
                <p class = "card-text text-danger">First Publish Year:${book.first_publish_year}</p>
            </div>
        </div>
        `
        bookContainer.append(newDiv)
    })
}
}

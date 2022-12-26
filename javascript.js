const btnForm = document.querySelector('.btnForm')
const formElem = document.querySelector('.formData')
const main = document.querySelector('.main')

let myLibrary = []

function Book(tittle, author, pages, read) {
  this.tittle = tittle
  this.author = author
  this.pages = pages
  this.read = read
  this.toggleRead = function () {
    this.read ? (this.read = false) : (this.read = true)
    main.innerHTML = ''
    addBookToLibrary()
  }
}

function removeBook(idx) {
  myLibrary.splice(idx, 1)
  main.innerHTML = ''

  addBookToLibrary()
}

function addBookToLibrary() {
  myLibrary.forEach((book, idx) => {
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    const tittle = document.createElement('h3')
    const author = document.createElement('h4')
    const pages = document.createElement('h5')
    // const status = document.createElement('h5')
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('removeBtn')
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', () => removeBook(idx))

    const readBtn = document.createElement('button')
    readBtn.classList.add('readBtn')
    readBtn.classList.add(book.read ? 'read' : 'not-read')
    readBtn.textContent = book.read ? 'Read' : 'Not-read'
    readBtn.addEventListener('click', () => book.toggleRead())
    tittle.textContent = book.tittle
    author.textContent = book.author
    pages.textContent = book.pages
    // status.textContent = book.status

    newCard.appendChild(tittle)
    newCard.appendChild(author)
    newCard.appendChild(pages)
    newCard.dataset.index = idx
    newCard.appendChild(readBtn)
    newCard.appendChild(removeBtn)

    // readBtn.addEventListener('click', () => readBook(idx))

    main.appendChild(newCard)
  })
}

// Get the modal
var modal = document.getElementById('myModal')

// Get the button that opens the modal
var btn = document.getElementById('myBtn')

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0]

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = 'none'
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

formElem.addEventListener('submit', (e) => {
  e.preventDefault()

  // construct a FormData object, which fires the formdata event
  const formData = new FormData(formElem)
  const tittle = `"${formData.get('tittle')}"`
  const author = formData.get('author')
  const pages = `${formData.get('pages')} Pages`
  const status = formData.get('status') === 'on' ? true : false

  // formdata gets modified by the formdata event

  myLibrary.push(new Book(tittle, author, pages, status))

  main.innerHTML = ''

  addBookToLibrary()

  formElem.reset()
  modal.style.display = 'none'
})

// const addBooks

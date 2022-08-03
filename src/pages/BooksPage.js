import React, { useContext, useEffect, useState, useRef } from 'react'
import styles from './BooksPage.module.scss'
import AuthContext from '../context/AuthContext'
import Book from '../components/Book'
import { motion } from 'framer-motion'
import BookPage from './BookPage'

const BooksPage = () => {
  const { books } = useContext(AuthContext)
  const { getBooks } = useContext(AuthContext)
  const [filter, setFilter] = useState([])
  const [idBook, setIdBook] = useState(null)
  const [newBooks, setNewBooks] = useState(null)
  const [category, setCategory] = useState('all')
  const [booksView, setBooksView] = useState(true)
  const [listView, setListView] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [bookInfo, setBookInfo] = useState({})
  const inputRef = useRef()
  const books_per_page = 9
 
 
 
  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const selectCategory = x => {
    setCategory(x)
    if (pageNumber === 0)
      setPageNumber(-1)
    else {
      setPageNumber(0)
    }
  }

  const chooseBook = (id) => {
    const pag = document.querySelector('#pagination')
    pag.style.display = 'none'
    setIdBook(id)
  }

  const pagi = x => {
    if (x === 'left') {
      if (pageNumber === 0) return
      if (pageNumber === -1) return
      setPageNumber(prev => prev - 1)
    }
    if (x === 'right') {
      if (filter.length === 0) return
      setPageNumber(prev => prev + 1)
    }
  }

  let book_info = null
  const loan = book_id => {
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === book_id) {
        book_info = books[i]
      }
    }
    setBookInfo(book_info)
    setBooksView(false)
  }

  const goBack = (id) => {
    setBooksView(true)
    const el = document.getElementById(`head`)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const displayNone = () => {
    // const s = document.querySelector('#list')
    // s.style.display = 'none'
    setListView(false)

  }
  const changeInput = () => {
    if (inputRef.current.value === '') {
      setNewBooks(null)
      return
    }
    setListView(true)
    // const sss = document.querySelector('#list')
    // sss.style.display = 'flex'
    searchBook(true)

  }
  const searchBook = (x = false) => {
    const b = []
    for (let i = 0; i < books.length; i++) {
      if (books[i].name.toString().toLowerCase().includes(`${inputRef.current.value.toString().toLowerCase()}`) || books[i].author.toString().toLowerCase().includes(`${inputRef.current.value.toString().toLowerCase()}`)) {
        b.push(books[i])
      }
    }
    setCategory('')
    if (x) {
      setNewBooks(b)
    } else {
      setFilter(b)
      setNewBooks(null)
    }
  }

  // if (document.querySelector('.input') === document.activeElement) {
  //   setNewBooks(null)
  // } 
  useEffect(() => {
    setFilter(books.filter(b => b.id === idBook))
    setBooksView(true)
    setNewBooks(null)
  },[idBook])

  useEffect(() => {
    getBooks()
  }, [])
  
  useEffect(() => {
    setFilter(books.slice(0, books_per_page))
    loading()
    inputRef.current.focus()
  }, [books])
  useEffect(() => {
    let pagesVisited = pageNumber * books_per_page
    if (pageNumber === -1)
      pagesVisited = 0
    if (category === 'all')
      setFilter(books.slice(pagesVisited, pagesVisited + books_per_page))
    else {
      setFilter(books.filter(b => b.category === category).slice(pagesVisited, pagesVisited + books_per_page))
    }
    const pag = document.querySelector('#pagination')
    pag.style.display = 'flex'
  }, [pageNumber])
  return (
    <>
      {/* <div>
        {location.state && location.state.location === 'login' && <div>You came from the LOGIN</div>}
        {location.state && location.state.location === 'nav' && <div>You came from the NAVBAR</div>}
      </div> */}
      <div id='head'></div>
      <div className={styles.outer}>
        <div className={styles.containerS}>
          <div className={styles.search_wrap}>
            <div onClick={() => searchBook()} className={styles.btnS}>
              <i className="fas fa-search"></i>
            </div>
            <input onBlur={()=>setListView(false)}  onFocus={() => changeInput()} onChange={()=> changeInput()} ref={inputRef} type="text" className={styles.input} placeholder="search..." />
          </div>
        </div>
        {newBooks === null ? (
          <div className={styles.list}>
            <div>
            </div>
          </div>
        ) : (
          <div style={listView ? {display:'flex'} : {display:'none'}} id='list' className={styles.list}>
            <div>{newBooks.map((b, i) => (
              <a onClick={() => chooseBook(b.id)} key={i} href='#'>{b.name} | {b.author}</a>
            ))}
            </div>
          </div>
        )}
      </div>


      {booksView ?
        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          exit={{ opacity: 0 }}><br />
          {/* <h1 className={styles.header}>Our Greate Books</h1> */}
          <div onClick={() => displayNone()} className={styles.filter2}>
            <div className={styles.filter}>
              <button className={category === 'all' && styles.active} onClick={() => selectCategory('all')}>All</button>
              <button className={category === 'Nonfiction' && styles.active} onClick={() => selectCategory('Nonfiction')}>Nonfiction</button>
              <button className={category === 'Fiction' && styles.active} onClick={() => selectCategory('Fiction')}>Fiction</button>
              <button className={category === 'Nostalgic' && styles.active} onClick={() => selectCategory('Nostalgic')}>Nostalgic</button>
              <button className={category === 'Philosophy' && styles.active} onClick={() => selectCategory('Philosophy')}>Philosophy</button>
              <button className={category === 'Food' && styles.active} onClick={() => selectCategory('Food')}>Food</button>
            </div>
          </div>
          {filter.length === 0 ? (
            <div className={styles.noRes}>
              <h1>No Results anymore...</h1>
            </div>
          ) : (
            <motion.div layout className={styles.books}>
              {filter.map((b, i) => (
                <div id={`book${b.id}`}>
                  <Book id={b.id} key={i} loan={loan} name={b.name} author={b.author}
                    img={b.imgURL} info={b.info} category={b.category}
                    year={b.yearPublished} days={JSON.stringify(b.day_to_loan)} fee={JSON.stringify(b.fee_per_day)} />
                </div>

              ))}
            </motion.div>
          )}

          <div className={styles.pagination} id="pagination">
            <div>
              <a onClick={() => pagi('left')} href="#head"><i className="fas fa-chevron-left"></i></a>
              <a className={`
            ${pageNumber === 0 && styles.activePage}
            ${pageNumber === -1 && styles.activePage}
            `} onClick={() => setPageNumber(0)} href='#head'>1</a>
              <a className={pageNumber === 1 && styles.activePage} onClick={() => setPageNumber(1)} href='#head'>2</a>
              <a className={pageNumber === 2 && styles.activePage} onClick={() => setPageNumber(2)} href='#head'>3</a>
              <a className={pageNumber === 3 && styles.activePage} onClick={() => setPageNumber(3)} href='#head'>4</a>
              <a className={pageNumber === 4 && styles.activePage} onClick={() => setPageNumber(4)} href='#head'>5</a>
              <a className={pageNumber === 5 && styles.activePage} onClick={() => setPageNumber(5)} href='#head'>6</a>
              <a onClick={() => pagi('right')} href='#head'><i className="fas fa-chevron-right"></i></a>
              <div></div>
            </div>
          </div>
        </motion.div>
        : <BookPage book={bookInfo} goBack={goBack} />
      }
      <h4>I need after 3 minutes Pop-Up to login - in rotation</h4>
      <h4>I need search bar for the books</h4>

    </>
  )
}

export default BooksPage
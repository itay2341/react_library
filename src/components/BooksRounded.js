import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef, useContext } from 'react'
import styles from './BookRounded.module.scss'
import AuthContext from '../context/AuthContext'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

const BooksRounded = () => {
    const {books} = useContext(AuthContext)
    const {getBooks} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [width, setWidth] = useState(0)
    const carousel = useRef()
    useEffect(() => {
        getBooks()
    },[])
    useEffect(() => {
        const imagesBooks = []
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        for (let i = 0; i < books.length; i++) {
            imagesBooks.push(books[i].imgURL)
        }
        setImages(imagesBooks)
        console.log(images) 
    },[books])

    return (
        <div>
            <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor:'grabbing'}}>
                <motion.div drag='x' dragConstraints={{right:0, left: -width}} className={styles.inner}>
                    {images.map(img => (
                        <motion.div key={img} className={styles.item}>
                            <img src={img} alt='itay'></img>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default BooksRounded
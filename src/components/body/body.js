import React from 'react'
import styles from './body.module.css'
import Posts from '../posts/posts'
import Article from '../article/article'
import { Outlet } from 'react-router-dom'

const Body = () => {
	return (
		<div className={styles.body__wrapper}>
		<Outlet/>
		
		</div>
	)
}

export default Body

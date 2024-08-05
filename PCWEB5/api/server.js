import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

import 'dotenv/config'

const app = express()
const port = 8080
const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: process.env.password,
	database: 'tinkergram'
}).promise()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

async function getPost(id) {
	const [rows] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id])
	return rows[0]
}

async function getPosts() {
	const [rows] = await pool.query(`SELECT * FROM posts`)
	return rows
}

async function addPost(caption, image) {
	const [result] = await pool.query(`
		INSERT INTO posts (caption, image)
		VALUES (?, ?)
	`, [caption, image])
	const id = result.insertId
	return getPost(id)
}

async function updatePost(id, caption, image) {
	await pool.query(`UPDATE posts set caption = ?, image = ? where id = ?`, [caption, image, id])
	return getPost(id)
}

async function deletePost(id) {
	await pool.query(`DELETE FROM posts WHERE id = ?`, [id])
}

app.post('/add', async (req, res) => {
	const { caption, image } = req.body
	const post = await addPost(caption, image)
	console.log('Post added: ', post)
	res.status(201).send({ status: 'success' })
})

app.get('/posts', async (req, res) => {
	const posts = await getPosts()
	res.status(202).send(posts)
})

app.get('/post/:id', async (req, res) => {
	const id = req.params.id
	const post = await getPost(id)
	res.status(202).send(post)
})

app.put('/post/:id', async (req, res) => {
	const id = req.params.id
	const { caption, image } = req.body
	const updatedPost = await updatePost(id, caption, image)
	res.status(202).send(updatedPost)
})

app.delete('/delete/:id', async (req, res) => {
	const id = req.params.id
	await deletePost(id)
	res.status(202).send({status:'success'})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
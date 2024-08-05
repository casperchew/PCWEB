import express from 'express'
import mysql from 'mysql2'

const app = express()
const port = 8080
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.password,
    database: 'athletes'
}).promise()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

async function getPlayers() {
    const [rows] = await pool.query('SELECT * FROM players')
    return rows
}

async function getPlayer(id) {
    const [rows] = await pool.query(`SELECT * FROM players WHERE id = ?`, [id])
    return rows
}

async function addPlayer(name, description, image) {
    const [result] = await pool.query(`
        INSERT INTO players (name, description, image)
        VALUES (?, ?, ?)
    `, [name, description, image])
    const id = result.insertId;
    return getPlayer(id)
}

async function editPlayer(id, name, description, image) {
    await pool.query(`UPDATE players SET name = ?, description = ?, image = ? where id = ?`, [name, description, image, id])
}

async function deletePlayer(id) {
    await pool.query(`DELETE FROM players WHERE id = ?`, [id])
}

app.get('/', async (req, res) => {
    const players = await getPlayers()
    res.render('index.ejs', { players })
})

app.get('/add', async (req, res) => {
    res.render('add.ejs')
})

app.post('/add', async (req, res) => {
    const { name, description, image } = req.body
    await addPlayer(name, description, image)
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const [player] = await getPlayer(id)
    res.render('edit.ejs', { id, player })
})

app.post('/edit/:id', async (req, res) => {
    const id = req.params.id
    const { name, description, image } = req.body
    await editPlayer(id, name, description, image)
    res.redirect('/')
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    await deletePlayer(id)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const axios = require('axios')
const app = express()
var bodyParser = require('body-parser')

const base_url = 'http://localhost:3000'

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.get('/', async (req,res) => {
    try {
        const response = await axios.get(base_url + '/breads')
        res.render('breads', {breads: response.data})
    } catch (err) {
        console.error(err)
        res.status(500).send('Error get / ')
    }
})

app.get('/bread/:id', async (req,res) => {
    try {
        const response = await axios.get(base_url + '/bread/' + req.params.id)
        res.render('bread', {bread: response.data})
    } catch (err) {
        console.error(err)
        res.status(500).send('Error get bread/id')
    }
})

app.get("/create", async (req,res) => {
    res.render('create')
})

app.post("/create", async (req,res) => {
    try {
        const data = { name: req.body.name, description: req.body.description, price: req.body.price}
        await axios.post(base_url + '/breads',data)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.status(500).send('Error /create')
    }
})

app.get("/edit/:id", async (req,res) => {
    try {
        const response = await axios.get(base_url + '/bread/' + req.params.id)
        res.render('edit', {bread: response.data})
    } catch (err) {
        console.error(err)
        res.status(500).send('Error edit/id')
    }
})

app.post("/edit/:id", async (req,res) => {
    try {
        const data = { name: req.body.name, description: req.body.description, price: req.body.price}
        await axios.put(base_url + '/bread/' + req.params.id,data)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.status(500).send('Error post edit/id')
    }
})

app.get("/delete/:id", async (req,res) => {
    try {
        await axios.delete(base_url + '/bread/' + req.params.id)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.status(500).send('Error delete/id')
    }
})

app.listen(5500, () => {
    console.log('Listening at http://localhost:5500')
})
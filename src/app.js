const express = require('express')

const responseHandlers = require('./utils/handleResponses')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('../config').api
const upload = require('./utils/multer')

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const moviesRouter = require('./movies/movies.router')
const genreRouter = require('./genres/genres.router')

const app = express()

app.use(express.json())

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

initModels()

app.get('/', (req, res) => {
    responseHandlers.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "users": `${config.host}/api/v1/users`,
        }
    })
})

app.get('/query', (req, res) => {
    res.status(200).json({
        myQueryGenre: req.query.genre,
        queries: req.query
    })
})

//? Ruta de ejemplo para subir imagenes
app.post('/upload-file', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'movieVideo', maxCount: 1 }]), (req, res) => {
    const file = req.files
    res.status(200).json({ file })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/genres', genreRouter)

app.use('*', (req, res) => {
    responseHandlers.error({
        res,
        status: 404,
        message: `URL not found, please try with ${config.host}`,
    })
})

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})
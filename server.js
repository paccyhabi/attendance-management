const express = require('express')
const cors = require('cors')
const app = express()
const corOptions = {
    origin: 'http://localhost:5173'
}
//midleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers
const router = require('./routes/usersRoutes.js')
const router2 = require('./routes/institutionRoutes.js')
app.use('/api/users', router)
app.use('/api/institutions', router2)


//testing api
app.get('/', (req, res) => {
    res.json({message:'hello from api'})
})


//port
const PORT = process.env.PORT || 8080


//server
app.listen(PORT, ()=> {
    console.log('server is running on port', PORT)
})
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

const routes = require('./routes')
app.use(routes)

app.listen(port, () => 
    console.info(`app listening on port ${port}`)
)
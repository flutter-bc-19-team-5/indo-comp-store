const express = require("express")
const app = express()

// const {} = require("./routes")
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, resp) => resp.json({ message: "Hello world!" }))

app.listen(port, () => 
    console.info(`app listening on port ${port}`)
)
const express = require("express")
const app = express()
const PORT = 8080
const { dbConnection } = require("./config/config")
const router = require("./routes/tasks")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()


app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))


require("dotenv").config();

const {sql, getConnection} = require('./db/config')

const express = require("express");
const cors = require("cors");

const logger = require('./helpers/logger')

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/servidores", require("./routes/servidores.routes"));
app.use("/api/servicios", require("./routes/servicios.routes"));
app.use("/api/detalle_servidores", require("./routes/detalle_servidores.routes"));
app.use("/api/login", require("./routes/auth.routes"));

logger.info('Iniciando servidor')

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto: "+ process.env.PORT)
})
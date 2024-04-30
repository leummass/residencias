/*
    route: '/api/servidores/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getServidores, guardarServidor, getServidorById, actualizarServidor, eliminarServidor } = require("../controllers/servidores.controller")

const router = Router();

//agregar middlewares
router.get("/",validarJWT, getServidores);

router.get("/:Id",validarJWT, getServidorById)

router.post("/", validarJWT,guardarServidor)

router.put("/",validarJWT, actualizarServidor)

router.delete("/:Id", validarJWT,eliminarServidor)

module.exports = router;
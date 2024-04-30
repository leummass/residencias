/*
    route: '/api/servicios/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getServicio,
    getServicios,
    actualizarServicio,
    eliminarServicio,
    guardarServicio,
} = require("../controllers/servicios.controller");

const router = Router();
//agregar middlewares
router.get("/:Id", validarJWT, getServicio);

router.get("/", validarJWT, getServicios);

router.put("/", validarJWT, actualizarServicio);

router.post("/", validarJWT, guardarServicio);

router.delete("/:Id", validarJWT, eliminarServicio);

module.exports = router;

/*
    route: '/api/detalle_servidores/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    actualizaDetalle,
    getDetalles,
    eliminarDetalle,
    guardaDetalle,
} = require("../controllers/detalle_servidores.controller");

const router = Router();

router.get("/:Id", validarJWT, getDetalles);

router.post("/", validarJWT, guardaDetalle);

router.delete("/:Id", validarJWT, eliminarDetalle);

router.put("/", validarJWT, actualizaDetalle);

module.exports = router;

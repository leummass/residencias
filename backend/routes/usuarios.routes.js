/*
    route: '/api/usuarios/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getUsuario,
    getUsuarios,
    guardarUsuario,
    actualizarUsuario,
    eliminarUsuario,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/:NoColaborador", getUsuario);

router.get("/",validarJWT,getUsuarios)

router.post(
    "/",
    [
        validarJWT,
        check("NoColaborador", "El número de colaborador es necesario")
            .not()
            .isEmpty(),
        check("Tipo", "El tipo de usuario necesario").not().isEmpty(),
        check("Contrasena", "La contraseña es necesaria es necesario")
            .not()
            .isEmpty(),
        validarCampos,
    ],
    guardarUsuario
);

router.put(
    "/",
    [
        validarJWT,
        check("NoColaborador", "El número de colaborador es necesario")
            .not()
            .isEmpty(),
        check("Tipo", "El tipo de usuario necesario").not().isEmpty(),
        check("Contrasena", "La contraseña es necesaria es necesario")
            .not()
            .isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete("/:NoColaborador", validarJWT, eliminarUsuario);


module.exports = router;

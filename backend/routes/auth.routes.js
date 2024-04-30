/*
    route: '/api/login/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {login, renewToken} = require('../controllers/auth.controller')
const router = Router();

//ruta de login
router.post(
    "/",
    [
        check("Contrasena", "La contraseña es obligatoria").not().isEmpty(),
        check("NoColaborador", "El número de colaborador es obligatorio").not().isEmpty(),
        validarCampos
    ],
    login
);

router.get(
    "/renew",
    validarJWT,
    renewToken
)


module.exports = router;

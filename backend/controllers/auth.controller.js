const { response } = require("express");
const bcrypt = require("bcryptjs");
const { getConnection, sql } = require("../db/config");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
    const {NoColaborador, Contrasena} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('NoColaborador', sql.Int, NoColaborador)
        .execute('sp_ObtenerUsuario')
        
        const usuarios = result.recordset.map( row => new Usuario(row.NoColaborador, row.Tipo, row.Contrasena))
        const usuario = usuarios[0];

        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Num. empleado/contraseña no válidos'
            })
        }

        const validPassword = bcrypt.compareSync(Contrasena, usuario.Contrasena)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Num. empleado/contraseña no válidos",
            });
        }

        //Generar TOKEN JWT
        const token = await generarJWT(usuario.NoColaborador, usuario.Tipo);

        res.json({
            ok: true,
            token,
        });

    } catch (error) {
        logger.error("Error en función login");
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
}

const renewToken = async(req,res=response) => {
    const NoColaborador = req.NoColaborador;
    const Tipo = req.Tipo;

    try {
        
        const token = await generarJWT(NoColaborador, Tipo);
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('NoColaborador', sql.Int, NoColaborador)
        .execute('sp_ObtenerUsuario')
        
        const usuarios = result.recordset.map( row => new Usuario(row.NoColaborador, row.Tipo, row.Contrasena))
        const usuario = usuarios[0];
        res.json({
            ok: true,
            token,
            usuario,
        })
    } catch (error) {
        logger.error("Error en función renewToken");
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
    
}

module.exports = {
    login,
    renewToken,
}
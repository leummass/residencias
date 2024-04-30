const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { getConnection, sql } = require("../db/config");
const logger = require("../helpers/logger");

const getUsuario = async (req, res) => {
    const { NoColaborador } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_ObtenerUsuario");

        const usuarios = result.recordset.map(
            (row) => new Usuario(row.NoColaborador, row.Tipo, row.Contrasena)
        );
        const usuario = usuarios[0];
        res.json({
            ok: true,
            msg: "Usuario encontrado",
            usuario,
        });
    } catch (error) {
        logger.error("Error en función getUsuario");
        logger.error(error);
        //guardar en logs
        let msgError = "Error inesperado ";
        if (
            error.originalError.hasOwnProperty("info") &&
            error.originalError.info.hasOwnProperty("message")
        ) {
            msgError = error.originalError.info.message;
        }
        res.status(500).json({
            ok: false,
            msg: msgError,
        });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query("SELECT * FROM Catalogo_Usuario")

        const usuarios = result.recordset.map(
            (row) => new Usuario(row.NoColaborador, row.Tipo, row.Contrasena)
        );
        res.json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        logger.error("Error en función getUsuarios");
        logger.error(error);
        //guardar en logs
        let msgError = "Error inesperado ";
        if (
            error.originalError.hasOwnProperty("info") &&
            error.originalError.info.hasOwnProperty("message")
        ) {
            msgError = error.originalError.info.message;
        }
        res.status(500).json({
            ok: false,
            msg: msgError,
        });
    }
}

const guardarUsuario = async (req, res) => {
    const { NoColaborador, Tipo, Contrasena } = req.body;
    try {
        const salt = bcrypt.genSaltSync();
        const crypContrasena = bcrypt.hashSync(Contrasena, salt);
        let msg = "";
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("NoColaborador", sql.Int, NoColaborador)
            .input("Tipo", sql.VarChar, Tipo)
            .input("Contrasena", sql.VarChar, crypContrasena)
            .execute("sp_GuardarUsuario");

        if (result.rowsAffected[0] != 0) {
            msg = "Usuario guardado";
            logger.info(`Usuario guardado`);
        } else {
            msg = "No se pudo guardar usuario";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función guardarUsuario");
        logger.error(error);
        //guardar en logs
        let msgError = "Error inesperado ";
        if (
            error.originalError.hasOwnProperty("info") &&
            error.originalError.info.hasOwnProperty("message")
        ) {
            msgError = error.originalError.info.message;
        }
        res.status(500).json({
            ok: false,
            msg: msgError,
        });
    }
};

const eliminarUsuario = async (req, res) => {
    const { NoColaborador } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_EliminarUsuario");

        if (result.rowsAffected[0] != 0) {
            msg = "Usuario eliminado";
            logger.info(
                `Usuario eliminado con NoColaborador: ${NoColaborador}`
            );
        } else {
            msg = "No se pudo eliminar colaborador";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función elimianrUsuario");
        logger.error(error);
        //guardar en logs
        let msgError = "Error inesperado ";
        if (
            error.originalError.hasOwnProperty("info") &&
            error.originalError.info.hasOwnProperty("message")
        ) {
            msgError = error.originalError.info.message;
        }
        res.status(500).json({
            ok: false,
            msg: msgError,
        });
    }
};

const actualizarUsuario = async (req, res) => {
    const { NoColaborador, Tipo, Contrasena } = req.body;
    try {
        const salt = bcrypt.genSaltSync();
        const crypContrasena = bcrypt.hashSync(Contrasena, salt);

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("NoColaborador", sql.Int, NoColaborador)
            .input("Tipo", sql.VarChar, Tipo)
            .input("Contrasena", sql.VarChar, crypContrasena)
            .execute("sp_EditarUsuario");

        if (result.rowsAffected[0] != 0) {
            msg = "Usuario actualizado";
            logger.info(
                `Usuario actualizado con NoColaborador: ${NoColaborador}`
            );
        } else {
            msg = "No se pudo actualizar colaborador";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función actualizarUsuario");
        logger.error(error);
        //guardar en logs
        let msgError = "Error inesperado ";
        if (
            error.originalError.hasOwnProperty("info") &&
            error.originalError.info.hasOwnProperty("message")
        ) {
            msgError = error.originalError.info.message;
        }
        res.status(500).json({
            ok: false,
            msg: msgError,
        });
    }
};

module.exports = {
    getUsuario,
    getUsuarios,
    guardarUsuario,
    eliminarUsuario,
    actualizarUsuario,
};

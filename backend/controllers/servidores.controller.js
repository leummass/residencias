const { response } = require("express");
const Servidor = require("../models/servidor");
const { getConnection, sql } = require("../db/config");
const logger = require("../helpers/logger");

const actualizarServidor = async (req, res) => {
    //recibe un JSON
    try {
        let msg = "";
        const { Id, Nombre, Descripcion, Tipo, } = req.body;
        const NoColaborador = req.NoColaborador;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .input("Nombre", sql.VarChar, Nombre)
            .input("Descripcion", sql.VarChar, Descripcion)
            .input("Tipo", sql.VarChar, Tipo)
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_EditarServidor");
        if (result.rowsAffected[0] != 0) {
            msg = "Servidor actualizado";
            logger.info(`Servidor actualizado con ID: ${Id}`);
        } else {
            msg = "No se encontraron servidores para modificar";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función actualizarServidor");
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

const eliminarServidor = async (req, res) => {
    //recibe el Id desde el url
    try {
        let msg = "";
        const { Id } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_EliminarServidor");
        if (result.rowsAffected[0] != 0) {
            msg = "Servidor eliminado";
            logger.info(`Servidor actualizado con ID: ${Id}`);
        } else {
            msg = "No se encontraron servidores para eliminar";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función eliminarServidor");
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

const guardarServidor = async (req, res) => {
    //recibe un JSON
    try {
        let msg = "";
        const { Nombre, Descripcion, Tipo, } = req.body;
        const NoColaborador = req.NoColaborador;
        let IdServidor = 0;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Nombre", sql.VarChar, Nombre)
            .input("Descripcion", sql.VarChar, Descripcion)
            .input("Tipo", sql.VarChar, Tipo)
            .input("NoColaborador", sql.Int, NoColaborador)
            .output("Id", sql.Int)
            .execute("sp_GuardarServidor");

        IdServidor = result.output.Id;

        if (result.rowsAffected[0] != 0) {
            msg = "Servidor guardado";
            logger.info(`Servidor guardado`);
        } else {
            msg = "No se pudo agregar servidor";
        }

        res.json({
            ok: true,
            msg,
            IdServidor,
        });
    } catch (error) {
        logger.error("Error en función guardarServidor");
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

const getServidores = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .execute("sp_ObtenerServidores");

        res.json({
            ok: true,
            servidores: result.recordset,
        });
    } catch (error) {
        logger.error("Error en función getServidores");
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

const getServidorById = async (req, res) => {
    try {
        let msg = "";
        const { Id } = req.params;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_ObtenerServidor");
        const servidores = result.recordset[0];
        res.json({
            ok: true,
            servidores,
        });
    } catch (error) {
        logger.error("Error en función getServidorById");
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
    getServidorById,
    getServidores,
    actualizarServidor,
    eliminarServidor,
    guardarServidor,
};

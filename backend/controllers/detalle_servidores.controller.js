const { response } = require("express");
const Detalle_Servidor = require("../models/detalle_servidor");
const { getConnection, sql } = require("../db/config");
const logger = require("../helpers/logger");

const actualizaDetalle = async (req, res) => {
    try {
        let msg = "";
        const {
            Id,
            IpDireccion,
            Dns,
            Tipo,
            NoVersion,
            Estatus,
            Hostname,
            SistemaOperativo,
            VersionSO,
            VersionBD,
        } = req.body;

        const NoColaborador = req.NoColaborador;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .input("IpDireccion", sql.VarChar, IpDireccion)
            .input("Dns", sql.VarChar, Dns)
            .input("Tipo", sql.VarChar, Tipo)
            .input("NoVersion", sql.VarChar, NoVersion)
            .input("Estatus", sql.VarChar, Estatus)
            .input("Hostname", sql.VarChar, Hostname)
            .input("SistemaOperativo", sql.VarChar, SistemaOperativo)
            .input("VersionSO", sql.VarChar, VersionSO)
            .input("VersionBD", sql.VarChar, VersionBD)
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_EditarDetalleServidor");

        if (result.rowsAffected[0] != 0) {
            msg = "Detalles de servidor actualizados";
            logger.info(`Detalles de servidor actualizados del ID: ${Id}`);
        } else {
            msg = "No se encontraron detalles para actualizar";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función actualizaDetalle");
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

const eliminarDetalle = async (req, res) => {
    try {
        let msg = "";
        const { Id } = req.params;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_EliminarDetalleServidor");

        if (result.rowsAffected[0] != 0) {
            msg = "Detalles de servidor eliminados";
            logger.info(`Detalles de servidor eliminados del ID: ${Id}`);
        } else {
            msg = "No se encontraron detalles para eliminar";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función eliminarDetalle");
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

const guardaDetalle = async (req, res) => {
    try {
        let msg = "";
        const {
            IdServidor,
            IpDireccion,
            Dns,
            Tipo,
            NoVersion,
            Estatus,
            Hostname,
            SistemaOperativo,
            VersionSO,
            VersionBD,
        } = req.body;

        const NoColaborador = req.NoColaborador;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("IdServidor", sql.Int, IdServidor)
            .input("IpDireccion", sql.VarChar, IpDireccion)
            .input("Dns", sql.VarChar, Dns)
            .input("Tipo", sql.VarChar, Tipo)
            .input("NoVersion", sql.VarChar, NoVersion)
            .input("Estatus", sql.VarChar, Estatus)
            .input("Hostname", sql.VarChar, Hostname)
            .input("SistemaOperativo", sql.VarChar, SistemaOperativo)
            .input("VersionSO", sql.VarChar, VersionSO)
            .input("VersionBD", sql.VarChar, VersionBD)
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_GuardarDetalleServidor");

        if (result.rowsAffected[0] != 0) {
            msg = "Detalles de servidor agregados";
            logger.info(`Detalles de servidor agregados`);
        } else {
            msg = "No se pudo agregar los detalles del servidor";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función guardarDetalle");
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

const getDetalles = async (req, res) => {
    //Obtiene los detalles de un servidor por su id
    try {
        let msg = "";
        const { Id } = req.params;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_ObtenerListaDetalleServidor");

        const detalles = result.recordset.map(
            (row) =>
                new Detalle_Servidor(
                    row.Id,
                    row.IdServidor,
                    row.IpDireccion,
                    row.Dns,
                    row.Tipo,
                    row.NoVersion,
                    row.Estatus,
                    row.Hostname,
                    row.SistemaOperativo,
                    row.VersionSO,
                    row.VersionBD,
                    row.FechaModificacion,
                    row.NoColaborador
                )
        );

        res.json({
            ok: true,
            detalles,
        });
    } catch (error) {
        logger.error("Error en función getDetalle");
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
    actualizaDetalle,
    eliminarDetalle,
    guardaDetalle,
    getDetalles,
};

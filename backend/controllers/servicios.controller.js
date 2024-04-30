const { response } = require("express");
const Servicio = require("../models/servicio");
const { getConnection, sql } = require("../db/config");
const logger = require("../helpers/logger");

const getServicio = async (req, res) => {
    try {
        const { Id } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_ObtenerServicio");

        const servicios = result.recordset.map(
            (row) =>
                new Servicio(
                    row.Id,
                    row.Nombre,
                    row.UrlProduccion,
                    row.IpProduccion,
                    row.UrlDesarrollo,
                    row.IpDesarrollo,
                    row.UrlTester,
                    row.IpTester,
                    row.Dns,
                    row.Usuario,
                    row.Password,
                    row.NoColaborador
                )
        );
        const servicio = servicios[0];
        res.json({
            ok: true,
            servicio,
        });
    } catch (error) {
        logger.error("Error en función getServicio");
        logger.error(error);
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

const getServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query("SELECT * FROM Catalogo_Servicio");

        const servicios = result.recordset.map(
            (row) =>
                new Servicio(
                    row.Id,
                    row.Nombre,
                    row.UrlProduccion,
                    row.IpProduccion,
                    row.UrlDesarrollo,
                    row.IpDesarrollo,
                    row.UrlTester,
                    row.IpTester,
                    row.Dns,
                    row.Usuario,
                    row.Password,
                    row.FechaModificacion,
                    row.NoColaborador
                )
        );
        res.json({
            ok: true,
            servicios,
        });
    } catch (error) {
        logger.error("Error en función getServicios");
        logger.error(error);
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

const actualizarServicio = async (req, res) => {
    try {
        const {
            Id,
            Nombre,
            UrlProduccion,
            IpProduccion,
            UrlDesarrollo,
            IpDesarrollo,
            UrlTester,
            IpTester,
            Dns,
            Usuario,
            Password,
        } = req.body;
        const NoColaborador = req.NoColaborador;
        let msg = "";
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .input("Nombre", sql.VarChar, Nombre)
            .input("UrlProduccion", sql.VarChar, UrlProduccion)
            .input("IpProduccion", sql.VarChar, IpProduccion)
            .input("UrlDesarrollo", sql.VarChar, UrlDesarrollo)
            .input("IpDesarrollo", sql.VarChar, IpDesarrollo)
            .input("UrlTester", sql.VarChar, UrlTester)
            .input("IpTester", sql.VarChar, IpTester)
            .input("Dns", sql.VarChar, Dns)
            .input("Usuario", sql.VarChar, Usuario)
            .input("Password", sql.VarChar, Password)
            .input("NoColaborador", sql.Int, NoColaborador)
            .execute("sp_EditarServicio");

        if (result.rowsAffected[0] != 0) {
            msg = "Servicio actualizado";
            logger.info(`Servicio con ID: ${Id} actualizado`);
        } else {
            msg = "No se pudo actualizar el servicio";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función actualizarServicio");
        logger.error(error);

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

const guardarServicio = async (req, res) => {
    try {
        const {
            Nombre,
            UrlProduccion,
            IpProduccion,
            UrlDesarrollo,
            IpDesarrollo,
            UrlTester,
            IpTester,
            Dns,
            Usuario,
            Password,
        } = req.body;

        const NoColaborador = req.NoColaborador;

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Nombre", sql.VarChar, Nombre)
            .input("UrlProduccion", sql.VarChar, UrlProduccion)
            .input("IpProduccion", sql.VarChar, IpProduccion)
            .input("UrlDesarrollo", sql.VarChar, UrlDesarrollo)
            .input("IpDesarrollo", sql.VarChar, IpDesarrollo)
            .input("UrlTester", sql.VarChar, UrlTester)
            .input("IpTester", sql.VarChar, IpTester)
            .input("Dns", sql.VarChar, Dns)
            .input("Usuario", sql.VarChar, Usuario)
            .input("Password", sql.VarChar, Password)
            .input("NoColaborador", sql.Int, NoColaborador)
            .output("Id", sql.Int)
            .execute("sp_GuardarServicio");

        if (result.rowsAffected[0] != 0) {
            msg = "Servicio guardado";
            logger.info(`Servicio guardado`);
        } else {
            msg = "No se pudo guardar servicio";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función guardarServicio");
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

const eliminarServicio = async (req, res) => {
    try {
        let msg = "";
        const { Id } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .execute("sp_EliminarServicio");

        if (result.rowsAffected[0] != 0) {
            msg = "Servicio eliminado";
            logger.info(`Servicio eliminado con ID: ${Id}`);
        } else {
            msg = "No se encontraron servicios para eliminar";
        }
        res.json({
            ok: true,
            msg,
        });
    } catch (error) {
        logger.error("Error en función eliminarServicio");
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
    actualizarServicio,
    eliminarServicio,
    getServicio,
    getServicios,
    guardarServicio,
};

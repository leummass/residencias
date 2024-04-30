const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {


    // Leer token
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }
    try {
        
        const { NoColaborador, Tipo } = jwt.verify(token, process.env.JWT_SECRET);

        req.NoColaborador = NoColaborador;
        req.Tipo = Tipo;
        

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}
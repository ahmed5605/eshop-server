function errorHandler(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        // jwt authentication error
        return res.status(401).json({message: "the user is not authorised"})
    }

    if(err.name === 'ValidationError'){
        // validation error
        return res.status(401).json({message: err})
    }

    return res.status(500).json(err);
}

module.exports = errorHandler;
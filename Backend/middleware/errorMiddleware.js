function errorMiddleware(error, req, res, next) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message : error.message,
        errors: error.errors,
        stack : process.env.NODE_ENV === "development" ? error.stack : undefined

    })
}

export default errorMiddleware  
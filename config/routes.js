const userRouter = require('../routes/user.router');
const authRouter = require('../routes/auth.router');
const productRouter = require('../routes/product.router');

module.exports = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
    app.use("/api/auth", authRouter);
    app.get("/", function(req, res) {
        res.set('content-type', 'text/html');
        res.send('Great! It works. Welcome to Store APP API!');
    })
};
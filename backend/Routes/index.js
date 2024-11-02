const express = require('express'); 
const { userRouter } = require('./user.routes');
const { accountRouter } = require('./account.routes');
const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/account', accountRouter);

module.exports = {
    rootRouter
};
const express = require('express');  // Corrected import statement
const { authMiddleware } = require('../middlewares/auth.middlewares');
const { Account } = require('../model/Account');
const mongoose = require('mongoose'); // Corrected import statement
const accountRouter = express.Router();

// Route to get account balance
accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;  // Access userId directly

    if (!userId) {
        return res.status(400).json({
            message: "userId not found"
        });
    }

    try {
        const accountHolder = await Account.findOne({ userId });
        if (!accountHolder) {
            return res.status(400).json({
                message: "Account holder not found"
            });
        }

        res.status(200).json({
            message: 'Successfully fetched the balance',
            balance: accountHolder.balance
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// Route to transfer funds
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    const fromUserId = req.userId;

    try {
        // Check sender's account and balance
        const fromAccount = await Account.findOne({ userId: fromUserId }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Check receiver's account
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Deduct from sender's account
        await Account.updateOne(
            { userId: fromUserId },
            { $inc: { balance: -amount } }
        ).session(session);

        // Credit to receiver's account
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = {
    accountRouter
};

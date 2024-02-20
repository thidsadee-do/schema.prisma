const db = require('../models/db');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await db.user.findMany();
        res.json({ users });
    } catch (err) {
        next(err);
    }
};

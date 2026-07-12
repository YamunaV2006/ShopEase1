const { sql, connectDB } = require("../config/db");

// ================= REGISTER =================

const register = async (req, res) => {

    const { fullName, email, password, phone } = req.body;

    try {

        await connectDB();

        await sql.query`
            INSERT INTO Users (FullName, Email, Password, Phone)
            VALUES (${fullName}, ${email}, ${password}, ${phone})
        `;

        res.status(201).json({
            message: "Registration Successful"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Registration Failed"
        });

    }

};

// ================= LOGIN =================

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        await connectDB();

        const result = await sql.query`
            SELECT * FROM Users
            WHERE Email = ${email}
            AND Password = ${password}
        `;

        if (result.recordset.length > 0) {

            res.json({
                message: "Login Successful"
            });

        } else {

            res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

    } catch (err) {

        console.error("LOGIN ERROR:", err);

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    register,
    login
};
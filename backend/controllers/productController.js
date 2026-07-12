const { sql, connectDB } = require("../config/db");

const getProducts = async (req, res) => {

    try {

        await connectDB();

        const result = await sql.query(`
            SELECT * FROM Products
        `);

        res.status(200).json(result.recordset);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error fetching products"
        });

    }

};

module.exports = {
    getProducts
};
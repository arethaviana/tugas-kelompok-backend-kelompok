const db = require("../config/db");

exports.getAll = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
            booking.*,
            users.nama,
            lapangan.nama_lapangan
            FROM booking
            JOIN users
            ON booking.user_id = users.id
            JOIN jadwal
            ON booking.jadwal_id = jadwal.id
            JOIN lapangan
            ON jadwal.lapangan_id = lapangan.id
        `);

        res.json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }

};

exports.create = async (req, res) => {

    try {

        const { jadwal_id } = req.body;

        await db.query(
            `
            INSERT INTO booking
            (user_id,jadwal_id)
            VALUES (?,?)
            `,
            [
                req.user.id,
                jadwal_id
            ]
        );

        res.json({
            message: "Booking berhasil"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }

};

exports.updateStatus = async (req, res) => {

    try {

        const { status } = req.body;

        await db.query(
            `
            UPDATE booking
            SET status=?
            WHERE id=?
            `,
            [
                status,
                req.params.id
            ]
        );

        res.json({
            message: "Status berhasil diubah"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }

};

exports.remove = async (req, res) => {

    try {

        await db.query(
            `
            DELETE FROM booking
            WHERE id=?
            `,
            [req.params.id]
        );

        res.json({
            message: "Booking berhasil dihapus"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }

};
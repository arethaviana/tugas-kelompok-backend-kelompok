const db = require("../config/db");

exports.getAll = async(req,res)=>{

 const [rows] = await db.query(`
 SELECT
 jadwal.*,
 lapangan.nama_lapangan
 FROM jadwal
 JOIN lapangan
 ON jadwal.lapangan_id=lapangan.id
 `);

 res.json(rows);

};

exports.create = async(req,res)=>{

 const {
 lapangan_id,
 tanggal,
 jam_mulai,
 jam_selesai
 } = req.body;

 await db.query(
 `INSERT INTO jadwal
 (lapangan_id,tanggal,jam_mulai,jam_selesai)
 VALUES (?,?,?,?)`,
 [
 lapangan_id,
 tanggal,
 jam_mulai,
 jam_selesai
 ]);

 res.json({
 message:"Jadwal berhasil ditambah"
 });

};

exports.update = async(req,res)=>{

 const {
 lapangan_id,
 tanggal,
 jam_mulai,
 jam_selesai
 } = req.body;

 await db.query(
 `UPDATE jadwal
 SET
 lapangan_id=?,
 tanggal=?,
 jam_mulai=?,
 jam_selesai=?
 WHERE id=?`,
 [
 lapangan_id,
 tanggal,
 jam_mulai,
 jam_selesai,
 req.params.id
 ]);

 res.json({
 message:"Jadwal berhasil diupdate"
 });

};

exports.remove = async(req,res)=>{

 await db.query(
 "DELETE FROM jadwal WHERE id=?",
 [req.params.id]
 );

 res.json({
 message:"Jadwal berhasil dihapus"
 });

};
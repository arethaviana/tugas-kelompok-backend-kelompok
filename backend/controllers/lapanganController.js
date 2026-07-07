const db = require("../config/db");

exports.getAll = async(req,res)=>{

   const [rows] =
   await db.query(
   "SELECT * FROM lapangan"
   );

   res.json(rows);

};

exports.getById = async(req,res)=>{

   const [rows] =
   await db.query(
   "SELECT * FROM lapangan WHERE id=?",
   [req.params.id]
   );

   res.json(rows[0]);

};

exports.create = async(req,res)=>{

   const {
      nama_lapangan,
      jenis,
      harga_per_jam,
      status
   } = req.body;

   await db.query(
   `INSERT INTO lapangan
   (nama_lapangan,jenis,harga_per_jam,status)
   VALUES (?,?,?,?)`,
   [
      nama_lapangan,
      jenis,
      harga_per_jam,
      status
   ]
   );

   res.json({
      message:"Lapangan berhasil ditambah"
   });

};

exports.update = async(req,res)=>{

   const {
      nama_lapangan,
      jenis,
      harga_per_jam,
      status
   } = req.body;

   await db.query(
   `UPDATE lapangan
   SET
   nama_lapangan=?,
   jenis=?,
   harga_per_jam=?,
   status=?
   WHERE id=?`,
   [
      nama_lapangan,
      jenis,
      harga_per_jam,
      status,
      req.params.id
   ]
   );

   res.json({
      message:"Lapangan berhasil diupdate"
   });

};

exports.remove = async(req,res)=>{

   await db.query(
   "DELETE FROM lapangan WHERE id=?",
   [req.params.id]
   );

   res.json({
      message:"Lapangan berhasil dihapus"
   });

};
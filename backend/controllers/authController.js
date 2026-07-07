const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{

   try{

      const {
         nama,
         email,
         password
      } = req.body;

      const hashPassword =
      await bcrypt.hash(password,10);

      await db.query(
      `INSERT INTO users
      (nama,email,password)
      VALUES (?,?,?)`,
      [nama,email,hashPassword]
      );

      res.status(201).json({
         message:"Register berhasil"
      });

   }catch(error){

      res.status(500).json(error);

   }

};

exports.login = async (req,res)=>{

   try{

      const {email,password} = req.body;

      const [rows] = await db.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
      );

      if(rows.length===0){
         return res.status(404).json({
            message:"User tidak ditemukan"
         });
      }

      const user = rows[0];

      const check =
      await bcrypt.compare(
      password,
      user.password
      );

      if(!check){

         return res.status(400).json({
            message:"Password salah"
         });

      }

      const token = jwt.sign(
      {
         id:user.id,
         role:user.role
      },
      process.env.JWT_SECRET,
      {
         expiresIn:"1d"
      });

      res.json({
         token,
         role:user.role,
         nama:user.nama
      });

   }catch(error){

      res.status(500).json(error);

   }

};
const db = require("../config/db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const getAuth = (req, res) => {
  db.query("SELECT id,username FROM user", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
    res.json(result);
  });
};

const postAuth = (req, res) => {
  const { username, password, role } = req.body;
  db.query("SELECT * FROM user WHERE username =?",[username], (err, result)=>{
    if(err){
      return res.status(500).json({ message: err.message });
    }
    if (result.length > 0) {
      return res.status(400).json({message: "Username already exists",});
    }
    const normalizedRole = (role || "").toLowerCase();
    db.query("INSERT INTO user (username, password, role) VALUES (?, ?, ?)",[username, password, normalizedRole], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const token = jwt.sign({ id: result.insertId, username, role: normalizedRole },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({
        message: "Registration Successful",
        token,
        id: result.insertId,username,role: normalizedRole,
      });
    });
  })
};

const checkLogin = (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Wrong Username" });
    }
    const user = result[0];
    if (password !== user.password) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login Successful",
      token,
      id: user.id,username: user.username,role: user.role,
    });
  });
};

module.exports = { getAuth, postAuth, checkLogin };
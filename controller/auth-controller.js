const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");





module.exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email, phone, sex, age } = req.body;

  try {
    // ตรวจสอบว่ามีการกรอกฟิลด์ข้อมูลที่จำเป็นครบถ้วนและไม่ว่างเปล่า
    if (!username || !password || !confirmPassword || !email || !phone || !sex || !age) {
      return next(new Error("กรุณากรอกข้อมูลให้ครบทุกช่อง"));
    }

    if (confirmPassword !== password) {
      return next(new Error("รหัสผ่านไม่ตรงกัน"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      username,
      password: hashedPassword,
      email,
      phone,
      sex,
      age
    };

    const rs = await db.user.create({ data: data });
    res.json({ msg: "ลงทะเบียนสำเร็จ" });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};


module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(username, password)
  try {
    if (!(username.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }

    const user = await db.user.findFirstOrThrow({ where: { username } });

    const pwOk = await bcrypt.compare(password, user.password)
    // console.log(user.password)
    if (!pwOk) {
      throw new Error("invalid login");
    }
    

    const payload = { id: user.user_id };
    // console.log(user.user_id);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};



exports.getme = (req, res, next) => {
  res.json(req.user);
};

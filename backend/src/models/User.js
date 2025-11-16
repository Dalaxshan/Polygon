const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return { id: result.insertId, name, email };
  }

  static async comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }
}

module.exports = User;
const db = require('../config/db');

class Post {
  static async create(post, userId) {
    const { title, content } = post;
    const [result] = await db.execute(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    return { id: result.insertId, title, content, user_id: userId };
  }

  static async findAll() {
    const [rows] = await db.execute(`
      SELECT p.*, u.name as author 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT p.*, u.name as author FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, post, userId) {
    const { title, content } = post;
    await db.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?',
      [title, content, id, userId]
    );
    return { id: parseInt(id), title, content, user_id: userId };
  }

  static async delete(id, userId) {
    const [result] = await db.execute(
      'DELETE FROM posts WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }
}

module.exports = Post;
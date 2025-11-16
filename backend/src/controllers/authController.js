const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../utils/validate');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user.id);

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    await db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
    res.json({ message: 'User updated', user: { id: userId, name, email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, updateUser };
// pages/api/auth/login.js
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Aquí es donde verificas las credenciales
    if (username === 'Neragoro' && password === '123456') {
      // Genera un token JWT
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

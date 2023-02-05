import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({
        email: user.email,
        id: user.id,
        time: Date.now()
      },
        //TODO move secret to .env
        "hello",
        { expiresIn: '8h' }
      )

      res.setHeader(
        "Set-Cookie",
        cookie.serialize('SPOTIFY_ACCESS_TOKEN', token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: '/',
          sameSize: 'lax',
          secure: process.env.NODE_ENV === 'production'
        })
      )
      return res.json(user)
    } else {
      return res.status(401).json({ error: 'Invalid login credentials' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unexpected error occuered' })
  }
}
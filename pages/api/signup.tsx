import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import prisma from "../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (e) {
    return res.status(401).json({ error: 'User already exists' })
  }

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

  return res.json({ user })
}
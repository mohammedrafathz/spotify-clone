import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from './prisma'


export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.SPOTIFY_ACCESS_TOKEN

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, 'hello')

        user = await prisma.user.findUnique({
          where: { id }
        })

        if (!user) throw new Error('User does not exist');
      } catch (error) {
        return res.status(401).json({ error: "Not Authorized" })
      }
      return handler(req, res, user)
    }

    return res.status(401).json({ error: "Not Authorized" })
  }
}
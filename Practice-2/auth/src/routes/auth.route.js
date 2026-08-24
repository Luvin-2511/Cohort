import { Router } from 'express'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { sendNotification } from '../config/mq.js'

const authRouter = Router()

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  async (req, res) => {
    try {
      const { emails, displayName, photos, id } = req.user
      let user = await userModel.findOne({
        googleId: id
      })
      if (!user) {
        user = await userModel.create({
          googleId: id,
          email: emails[0].value,
          name: displayName,
          avatar: photos[0].value
        })
      }

      await sendNotification({
        userId: user._id,
        email: user.email,
        timestamp: new Date()
      })

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      res.cookie('token', token, {
        httpOnly: true
      })

      res.redirect('http://localhost:5173/')
    } catch (err) {
      console.error(err)
      res.redirect('/')
    }
  }
)

authRouter.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    if (!user) return res.status(401).json({ error: 'User not found' })

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

authRouter.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

export default authRouter

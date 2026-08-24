import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/auth',authRouter)

app.get('/_status/healthz',(req,res)=>{
    res.status(200).json({
        message: "Auth service working fine !",
        status:'ok'
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)



export default app

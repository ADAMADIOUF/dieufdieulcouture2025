import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  // Create a JWT token with the userId as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_DIEUFDIEULCOUTURE, {
    expiresIn: '30d', // Set token expiration to 30 days
  })

  // Set the cookie with the token
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true only in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  })
}

export default generateToken

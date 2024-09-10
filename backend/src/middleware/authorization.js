import basicAuth from 'express-basic-auth'

const users = {
  admin: { password: 'letmein', role: 'admin' },
  user: { password: 'password', role: 'user' },
  theFirstUser: { password: 'password1', role: 'user' },
  anotherUser: { password: 'secret', role: 'user' },
}

export const authHandler = basicAuth({
  authorizer: (username, password) => {
    if (users[username]) {
      return basicAuth.safeCompare(password, users[username].password)
    }
    return false
  },
  challenge: true,
})

export const checkRole = role => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    )
    const [username] = credentials.split(':')

    const user = users[username]

    if (user && user.role === role) {
      next()
    } else {
      res
        .status(403)
        .send('Forbidden: You do not have access for that operation')
    }
  }
}

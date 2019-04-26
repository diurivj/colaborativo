const router = require('express').Router()
const passport = require('../handlers/passport')
const User = require('../models/User')
const { isLogged } = require('../handlers/middlewares')

router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', (req, res, next) => {
  User.register({ ...req.body }, req.body.password)
    .then(() => res.redirect('/login'))
    .catch(err => next(err))
})

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.redirect('/login')
    req.logIn(user, err => {
      if (err) return next(err)
      req.app.locals.loggedUser = user
      if (req.user.role === 'ADMIN') return res.redirect('/admin')
      else if (req.user.role === 'USER') return res.redirect('/profile')
    })
  })(req, res, next)
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/login')
})

router.get('/profile', isLogged, (req, res, next) => res.render('auth/profile'))

module.exports = router

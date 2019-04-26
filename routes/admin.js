const router = require('express').Router()
const Artist = require('../models/Artist')
const User = require('../models/User')
const Comment = require('../models/Comment')

router.get('/admin', (req, res, next) => res.render('admin/profile'))

router.get('/admin/artists', (req, res, next) => {
  Artist.find()
    .sort({ createdAt: -1 })
    .then(artists => {
      res.render('admin/artists', { artists })
    })
    .catch(err => next(err))
})

router.post('/admin/artists/create', (req, res, next) => {
  Artist.create({ ...req.body })
    .then(() => res.redirect('/admin/artists'))
    .catch(err => next(err))
})

router.get('/admin/artists/delete/:id', (req, res, next) => {
  const { id } = req.params
  Artist.findByIdAndDelete(id)
    .then(() => res.redirect('/admin/artists'))
    .catch(err => next(err))
})

router.get('/admin/users', (req, res, next) => {
  User.find()
    .then(users => {
      res.render('admin/users', { users })
    })
    .catch(err => next(err))
})

router.get('/admin/comments', (req, res, next) => {
  Comment.find()
    .populate('owner')
    .populate('artist')
    .then(comments => {
      res.render('admin/comments', { comments })
    })
    .catch(err => next(err))
})

module.exports = router

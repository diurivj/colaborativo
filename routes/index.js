const router = require('express').Router()
const Artist = require('../models/Artist')
const Comment = require('../models/Comment')
const { isLgged } = require('../handlers/middlewares')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/artists', (req, res, next) => {
  Artist.find()
    .sort({ rating: -1 })
    .then(artists => {
      res.render('artists/all', { artists })
    })
    .catch(err => next(err))
})

router.get('/artists/:id', (req, res, next) => {
  const { id } = req.params
  const findArtists = Artist.findById(id)
  const findComments = Comment.find({ artist: id })
    .sort({ createdAt: -1 })
    .populate('owner')
  Promise.all([findArtists, findComments])
    .then(response => {
      res.render('artists/detail', {
        artist: response[0],
        comments: response[1]
      })
    })
    .catch(err => next(err))
})

router.post('/artists/:id', (req, res, next) => {
  console.log(req.user)
  Comment.create({
    owner: req.user._id,
    artist: req.params.id,
    body: req.body.comment
  })
    .then(() => res.redirect(`/artists/${req.params.id}`))
    .catch(err => next(err))
})

module.exports = router

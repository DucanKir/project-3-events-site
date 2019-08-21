const Happening = require('../models/Happening')

/* Note to team:
- I'm not building is user related pieces yet (e.g. populating records)
- I'm also not chaining the .catch(next) elements in yet
- In both cases, that's becuase these are highly dependant elements we haven't assinged yet (secureRoute and errorHandler)
- I haven't added anything related to comments becuase we're not building those in yet.
*/

function indexRoute(req, res, next) {
  Happening.find(req.query)
    .then(happening => res.json(happening))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser._id
  req.body.attendees = [ req.currentUser._id ]
  const happening = new Happening(req.body)

  happening.save()
    .then(happening => res.status(201).json(happening))
    .catch(next)
}

function showRoute(req, res, next) {
  Happening.findById(req.params.id)
    .populate({ path: 'user', select: 'name'})
    .populate({ path: 'comments.user', select: 'name'})
    .populate({ path: 'attendees', model: 'User', select: 'name photo'})
    .then(happening => {
      console.log(happening)
      if (!happening) return res.sendStatus(404)
      return res.json(happening)
    })
    .catch(next)
}

function updateRoute(req, res, next) {
  Happening.findById(req.params.id)
    .then(happening => {
      if (!happening) return res.sendStatus(404)
      return happening.set(req.body)
    })
    .then(happening => happening.save())
    .then(happening => res.json(happening))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Happening.findById(req.params.id)
    .then(happening => {
      if (!happening) return res.sendStatus(404)

      return happening.remove()
        .then(() => res.sendStatus(204))
        .catch(next)
    })
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser._id

  Happening.findById(req.params.id)
    .then(happening => {
      if(!happening) return res.sendStatus(404)
      happening.comments.unshift(req.body)
      return happening.save()
    })
    .then(happening => Happening.populate(happening, { path: 'comments.user', select: 'name'}))
    .then(happening => Happening.populate(happening, { path: 'attendees', model: 'User', select: 'name photo'}))
    .then(happening => res.json(happening))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Happening.findById(req.params.id)
    .then(happening => {
      if(!happening) return res.sendStatus(404)
      const comment = happening.comments.id(req.params.commentId)
      if(!comment) return res.sendStatus(404)
      comment.remove()
      return happening.save()
    })
    .then(happening => Happening.populate(happening, { path: 'comments.user', select: 'name'}))
    .then(happening => res.json(happening))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}

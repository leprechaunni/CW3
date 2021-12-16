const {Router} = require('express')
const Game = require('../models/game')
const router = Router()

router.get('/', async (req, res) => {
   const games = await Game.getAll()
   res.render('index', {
      title: 'Главная страница',
      isHome: true,
      games,
   });
})

router.get('/game/:id/edit', async (req, res) => {
   if(!req.query.allow) {
      return res.redirect('/')
   }

   const game = await Game.getById(req.params.id)

   res.render('game-edit', {
      title: `Редактировать ${game.title}`,
      game,
   })

})

router.post('/game/edit', async (req, res) => {
   await Game.update(req.body)

   res.redirect('/')
})

router.post('/game/delete', async (req, res) => {
   await Game.delete(req.body)

   res.redirect('/')
})




router.get('/game/:id', async (req, res) => {
   const game = await Game.getById(req.params.id)
   res.render('game', {
      layout: 'game',
      title: `${game.title}`,
      game,
   });
})

module.exports = router
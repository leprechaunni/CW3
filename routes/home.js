const { Router } = require('express');
const Game = require('../models/game');
const router = Router();

router.get('/', async (req, res) => {
   const games = await Game.find().populate('userId', 'email name');
   res.render('index', {
      title: 'Главная страница',
      isHome: true,
      games,
   });
});

router.get('/game/:id/edit', async (req, res) => {
   if (!req.query.allow) {
      return res.redirect('/');
   }

   const game = await Game.findById(req.params.id);

   res.render('game-edit', {
      title: `Редактировать ${game.title}`,
      game,
   });
});

router.post('/game/edit', async (req, res) => {
   const { id } = req.body;
   delete req.body.id;
   await Game.findByIdAndUpdate(id, req.body);

   res.redirect('/');
});

router.post('/game/delete', async (req, res) => {
   try {
      await Game.deleteOne({ _id: req.body.id });
      res.redirect('/');
   } catch (e) {
      console.log(e);
   }
});

router.get('/game/:id', async (req, res) => {
   const game = await Game.findById(req.params.id);
   res.render('game', {
      layout: 'game',
      title: `${game.title}`,
      game,
   });
});

module.exports = router;

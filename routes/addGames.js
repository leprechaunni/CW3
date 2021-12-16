const { Router } = require('express');
const Game = require('../models/game')
const router = Router();

router.get('/', (req, res) => {
   res.render('addGames', {
      title: 'Добавить игру',
      isAdd: true,
   });
});

router.post('/', async (req, res) => {
   const game = new Game(req.body.title, req.body.img, req.body.description, req.body.genre)
   await game.save()

   res.redirect('/');
});



module.exports = router;

const { Router } = require('express');
const Game = require('../models/game');
const router = Router();

router.get('/', (req, res) => {
   res.render('addGames', {
      title: 'Добавить игру',
      isAdd: true,
   });
});

router.post('/', async (req, res) => {
   const game = new Game({
      title: req.body.title,
      img: req.body.img,
      description: req.body.description,
      genre: req.body.genre,
      url: req.body.url,
      userId: req.user,
   });

   try {
      await game.save();
      res.redirect('/');
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;

const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
   res.render('addGames', {
      title: 'Добавить игру',
      isGirls: true,
   });
});

router.post('/', (req, res) => {
   console.log(req.body);
   res.redirect('/');
});

module.exports = router;

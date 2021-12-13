const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
   res.render('boysGames', {
      title: 'Игры для мальчиков',
      isBoys: true,
   });
})

module.exports = router
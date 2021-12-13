const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
   res.render('girlsGames', {
      title: 'Игры для девочек',
      isGirls: true,
   });
})

module.exports = router
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
   allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const app = express();

const homeRoutes = require('./routes/home');
const girlsGamesRoutes = require('./routes/girlsGames');
const boysGamesRoutes = require('./routes/boysGames');
const addGamesRoutes = require('./routes/addGames');
const User = require('./models/user');

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs',
   handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine('hbs', hbs.engine); //регистрируем движок
app.set('view engine', 'hbs'); //начинаем его использовать
app.set('views', 'views');

app.use(async (req, res, next) => {
   try {
      const user = await User.findById('620be5de2a39dddaf91e2201');
      req.user = user;
      next();
   } catch (e) {
      console.log(e);
   }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/girlsGames', girlsGamesRoutes);
app.use('/boysGames', boysGamesRoutes);
app.use('/addGames', addGamesRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
   try {
      const url =
         'mongodb+srv://victoria:eVNyeqtlsT9QCbwy@cluster0.magin.mongodb.net/games';
      await mongoose.connect(url, { useNewUrlParser: true });
      const candidate = await User.findOne();
      if (!candidate) {
         const user = new User({
            email: 'ex@mail.com',
            name: 'example',
         });
         await user.save();
      }
      app.listen(PORT, () => {
         console.log(`server is running on ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
}

start();

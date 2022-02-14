const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

const homeRoutes = require('./routes/home');
const girlsGamesRoutes = require('./routes/girlsGames');
const boysGamesRoutes = require('./routes/boysGames');
const addGamesRoutes = require('./routes/addGames');

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs',
});
app.engine('hbs', hbs.engine); //регистрируем движок
app.set('view engine', 'hbs'); //начинаем его использовать
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/girlsGames', girlsGamesRoutes);
app.use('/boysGames', boysGamesRoutes);
app.use('/addGames', addGamesRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
   try {
      const url = 'mongodb+srv://victoria:eVNyeqtlsT9QCbwy@cluster0.magin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
      await mongoose.connect(url, { useNewUrlParser: true });
      app.listen(PORT, () => {
         console.log(`server is running on ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
}

start();

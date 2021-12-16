const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { resolve } = require('dns');
const { rejects } = require('assert');

class Game {
   constructor(title, img, description, genre) {
      this.title = title;
      this.img = img;
      this.description = description;
      this.genre = genre;
      this.id = uuidv4();
   }

   toJSON() {
      return {
         title: this.title,
         img: this.img,
         description: this.description,
         genre: this.genre,
         id: this.id,
      };
   }

   static async update(game) {
      const games = await Game.getAll()

      const idx = games.findIndex(g => g.id === game.id)
      games[idx] = game

      return new Promise((resolve, reject) => {
         fs.writeFile(
            path.join(__dirname, '..', 'data', 'games.json'),
            JSON.stringify(games),
            (err) => {
               if (err) {
                  reject(err);
               } else {
                  resolve();
               }
            }
         );
      });
   }

   static async delete(game) {
      const games = await Game.getAll()

      const idx = games.findIndex(g => g.id === game.id)
      games.splice(idx, 1)

      return new Promise((resolve, reject) => {
         fs.writeFile(
            path.join(__dirname, '..', 'data', 'games.json'),
            JSON.stringify(games),
            (err) => {
               if (err) {
                  reject(err);
               } else {
                  resolve();
               }
            }
         );
      });
   }

   async save() {
      const games = await Game.getAll();
      games.push(this.toJSON());

      return new Promise((resolve, reject) => {
         fs.writeFile(
            path.join(__dirname, '..', 'data', 'games.json'),
            JSON.stringify(games),
            (err) => {
               if (err) {
                  reject(err);
               } else {
                  resolve();
               }
            }
         );
      });
   }

   static getAll() {
      return new Promise((resolve, reject) => {
         fs.readFile(
            path.join(__dirname, '..', 'data', 'games.json'),
            'utf-8',
            (err, content) => {
               if (err) {
                  reject(err);
               } else {
                  resolve(JSON.parse(content));
               }
            }
         );
      });
   }

   static async getById(id) {
      const games = await Game.getAll();
      return games.find((g) => g.id === id);
   }
}
module.exports = Game;
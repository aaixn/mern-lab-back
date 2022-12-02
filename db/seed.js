const mongoose = require('./connection')
const Recipe = require('../models/Recipe')

const recipeData = require('./seeds.json')

Recipe.deleteMany()
    .then(() => Recipe.insertMany(recipeData))
    .then(console.log)
    .catch(console.error)
    .finally(process.exit)

module.exports = mongoose
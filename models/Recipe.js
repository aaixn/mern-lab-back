const mongoose = require('../db/connection');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cookTime: String,
    difficult: Boolean,
    ingredients: [String],
    instructions: String,
    dateCreated: Date.now,

})

module.exports = mongoose.model('Recipe', RecipeSchema)
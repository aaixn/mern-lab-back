const express = require('express');
const Recipe = require('../models/Recipe');
// Require handleValidateId by destructuring it from the exports object
const {
    handleValidateId,
    handleRecordExists,
  } = require('../middleware/custom_errors');
const router = express.Router();


// INDEX
// GET api/jobs
router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.find({})
        res.json(recipes)
    } catch (err){
        next(err)
    }
});

// SHOW
// GET api/jobs/5a7db6c74d55bc51bdf39793
router.get('/:id', handleValidateId, async (req, res, next) => {
    try {
    await Recipe.findById(req.params.id)
      .then(handleRecordExists)
      .then((recipe) => {
        res.json(recipe);
      })
    } catch(err) {
        next(err)
    }
  });


// CREATE
// POST api/jobs
router.post('/', async (req, res, next) => {
    try {
        const recipeAdd = await Recipe.create(req.body);
        res.status(201).json(recipeAdd)
    } catch (err) {
        next(err)
    }
});


// UPDATE
// PUT api/jobs/5a7db6c74d55bc51bdf39793
router.put('/:id', handleValidateId, async (req, res, next) => {
    try {
        const recipeUpdate = await Recipe.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(handleRecordExists)
        .then((recipe) => {
          res.json(recipe);
        })
    } catch (err) {
         next(err)
    }
});



// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
router.delete('/:id', handleValidateId, async (req, res, next) => {
    try {
        const recipeDelete = await Recipe.findOneAndDelete({_id: req.params.id})
        .then(handleRecordExists)
        .then((recipe) => {
          res.sendStatus(204);
        })    
    } catch (err) {
        next(err)
    }
});

module.exports = router

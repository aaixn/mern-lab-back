const { log } = require('console');
const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

module.exports = router;


// INDEX
// GET api/jobs
router.get('/',async (req, res, next) => {
    try {
        const recipes = await Recipe.find({})
        res.json(recipes)
    } catch (err){
        next(err)
    }
});

// SHOW
// GET api/jobs/5a7db6c74d55bc51bdf39793
router.get('/:id', (req, res) => {});

// CREATE
// POST api/jobs
router.post('/', (req, res) => {});

// UPDATE
// PUT api/jobs/5a7db6c74d55bc51bdf39793
router.put('/:id', (req, res) => {});

// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
router.delete('/:id', (req, res) => {});

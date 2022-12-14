const should = require('chai').should()
const expect = require('chai').expect
const e = require('express');
const supertest = require('supertest')
const api = supertest(require('../index.js'));

describe('GET /api/recipes', () => {
    it('Should return a 200 response', done => {
        api
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
})


describe('GET /api/recipes/:id', () => {
    let id
    before(done => {
        api
        .get('/api/recipes')
        .set('Accept', 'application/son')
        .end((err, res) => {
            id = res.body[0]._id
            done()
        })
    }) 
    
    it('Retrieve a recipe by it\'s ID with the correct fields', done => {
        api
        .get(`/api/recipes/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.body._id).to.equal(id)
            expect(res.body.title).to.equal('Braised Beef Chilli')
            expect(res.body.cookTime).to.be.a('string')
            done()
        })
    })
})

describe('DELETE /api/recipes/:id', () => {
    let beforeLength
    let theIdToBeDeleted

    before(done => {
        api
            .get('/api/recipes')
            .set('Accept', 'application/json')
            .end((err, res) => {
                beforeLength = res.body.length
                theIdToBeDeleted = res.body[0]._id
                done()
            })
    })
    
    before( done => {
        api
            .delete(`/api/recipes/${theIdToBeDeleted}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                done()
            })
            
    })

    it('Delete a recipe by ID', done => {
        api
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .end((err, res) =>{
            expect(res.body.length).to.equal(beforeLength - 1)
            expect(res.body.find((recipe) => recipe._id == theIdToBeDeleted)).to.equal(undefined)
            done()
        })
    })
})

describe('POST /api/recipes', () => {
    const newRecipe = {
        title: 'Ice-cream'
    }

    before(done =>{
        api
        .post('/api/recipes')
        .set('Accept', 'application/json')
        .send(newRecipe)
        .end(done)
    })
    it('Should add a recipe object to the collection recipe and return it', done =>{
        api
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .end ((err, res) => {
            expect(res.body.find((recipe) => recipe.title === newRecipe.title)).to.be.an('object')
            done()
        })
    })
})

describe('PUT /api/recipes/:id', () => {
    let recipeUpdate
    let idToBeUpdated

    before(done =>{
        api
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .end((err, res) => {
            recipeUpdate = res.body[0]
            idToBeUpdated = res.body[0]._id
            done()
        })
    })
    before(done => {
        api
        .put(`/api/recipes/${idToBeUpdated}`)
        .set('Application', 'application/json')
        .send({
            title: 'Yogurt'
        })
        .end((err, res) => {
            done()
        })
    })

    it('Should update a recipe by ID', done => {
        api
        .get(`/api/recipes/${idToBeUpdated}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(res.body.title).to.equal('Yogurt')
            done()
        })
    })
})
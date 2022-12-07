const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest(require('../index.js'));

describe('GET /api/recipes', () => {
    it('should return a 200 response', done => {
        api
        .get('/api/recipes')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
})

// describe('GET /api/recipes/:id', () => {
//     it('should return an object of a specific ID and contains the right fields'), done => {
//         api
//             .get('/api/recipes/638fdfd593ed8591ff3fbd7b')
//             .set('Accept', 'application/json')
//             .end((err, res) => {
//                 expect(res, body).to.include({
//                     _id: "638fdfd593ed8591ff3fbd7b",
//                     title: "Braised Beef Chilli",
//                     cookTime: "45 minutes"
//                 })
//                 done()
//             })
//     }
// })


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
    
    it('retrieve a recipe by it\'s ID with the correct fields', done => {
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
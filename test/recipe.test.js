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

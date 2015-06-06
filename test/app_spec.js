var app = require('../')
var supertest = require('supertest')
var assert = require('assert')

describe('application', function() {

    var http
    before(function() {
        http = supertest(app)
    })

    it('should respond kindly', function() {
        http.get('/').end(function(err, res) {
            assert(res.statusCode >= 200)
            assert(res.statusCode <= 300)
        })
    })

    it('should have an img tag', function() {
        http.get('/').end(function(err, res) {
            assert(res.text.match('img'))
        })
    })

    it('should respond unkindly to an unauthenticated user', function() {
        var user = '12345'
        for (var i = 0; i < 10; i++) {
            user += user
        }

        http.get('/' + user).end(function(err, res) {
            assert(res.statusCode >= 400)
        })
    })
})

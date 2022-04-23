var chai = require('chai');
var assert = chai.assert;
var should = chai.should()
var expect = chai.expect
var server = require('../app')
let chaiHttp = require('chai-http');
const { response } = require('express');
chai.use(chaiHttp)

describe("Get Bitcoin Info API", function () {
    it('get info with no currency param', function (done) {
        chai.request(server)
            .get('/getBitcoinInfo')
            .end((err, response) => {
                expect(response.status).to.be.equal(400)
                expect(response.body)
                    .to.have.all.keys(
                        "status",
                        "error"
                    )
                done()
            })
    })
    it('get info with correct currency param', function (done) {
        chai.request(server)
            .get('/getBitcoinInfo?currency=bdt')
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                expect(response.body)
                    .to.have.all.keys(
                        "status",
                        "Current Coin Rate",
                        "Minimum Rate in Last 30 Days",
                        "Maximum Rate in Last 30 Days",
                        "disclaimer"
                    )
                done()
            })
    })

    it('get info with wrong currency param', function (done) {
        chai.request(server)
            .get('/getBitcoinInfo?currency=bdtWrong')
            .end((err, response) => {
                expect(response.status).to.be.equal(404)
                expect(response.body)
                    .to.have.all.keys(
                        "status",
                        "error"
                    )
                done()
            })
    })

})
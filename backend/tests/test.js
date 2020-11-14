// Import testing dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');
const { expect } = require('chai');

// Configure chai (Use the 'should' assert style)
chai.use(chaiHttp);
chai.should();

// Dummy data
var gatInksBlack = {
    'name': "Gateron Ink Black",
    'type': "linear",
    'actuation': 60,
    'bottom': 80,
    'travel': 4,
}

var gatInksBlackWrong = {
    'name': "Gateron Ink Black",
    'type': "linear",
    'actuation': 80,
    'bottom': 100,
    'travel': 4,
}

var gatInksRed = {
    'name': "Gateron Ink Red",
    'type': "linear",
    'actuation': 45,
    'bottom': 60,
    'travel': 4,
}

// Test POST (add) switch (gatInksBlack)
describe('Switches', () => {
    describe("Post", () => {
        it ('should add Gateron Ink Black', function (done) {
            chai.request(app)
                .post('/api/switches')
                .set('content-type', 'application/json')
                .send(gatInksBlack)
                .end((error, result) => {
                    result.should.have.status(200);
                    result.body.message.should.equal("New switch added");
                    result.body.data.should.have.property('name');
                    result.body.data.should.have.property('type');
                    result.body.data.should.have.property('actuation');
                    result.body.data.should.have.property('bottom');
                    result.body.data.should.have.property('travel');
                    result.body.data.name.should.equal(gatInksBlack.name);
                    result.body.data.type.should.equal(gatInksBlack.type);
                    result.body.data.actuation.should.equal(gatInksBlack.actuation);
                    result.body.data.bottom.should.equal(gatInksBlack.bottom);
                    result.body.data.travel.should.equal(gatInksBlack.travel);
                    done();
                });
        });
    });
});

// adding second switch for further testing purposes
describe('Switches', () => {
    describe("Post", () => {
        it ('should add Gateron Ink Red', function (done) {
            chai.request(app)
                .post('/api/switches')
                .set('content-type', 'application/json')
                .send(gatInksRed)
                .end((error, result) => {
                    result.should.have.status(200);
                    result.body.message.should.equal("New switch added");
                    result.body.data.should.have.property('name');
                    result.body.data.should.have.property('type');
                    result.body.data.should.have.property('actuation');
                    result.body.data.should.have.property('bottom');
                    result.body.data.should.have.property('travel');
                    result.body.data.name.should.equal(gatInksRed.name);
                    result.body.data.type.should.equal(gatInksRed.type);
                    result.body.data.actuation.should.equal(gatInksRed.actuation);
                    result.body.data.bottom.should.equal(gatInksRed.bottom);
                    result.body.data.travel.should.equal(gatInksRed.travel);
                    done();
                });
        });
    });
});

// Test GET switch(es)
describe('GET', () => {
    // Test GET all switches' details
    // Cannot test individual switches because of unique _id
    it ('should get all switches', function(done) {
        chai.request(app)
            .get('/api/switches')
            .end((error, result) => {
                result.should.have.status(200);
                result.body.message.should.equal("Switches retrieved successfully");
                done();
            });
    });
    // Test GET Gateron Ink Black's details
    it ('should get Gateron Ink Black', function(done) {
        chai.request(app)
            .get('/api/switches/Gateron%20Ink%20Black')
            .end((error, result) => {
                result.should.have.status(200);
                result.body.message.should.equal("Gateron Ink Black has been found");
                result.body.data.should.have.property('name');
                result.body.data.should.have.property('type');
                result.body.data.should.have.property('actuation');
                result.body.data.should.have.property('bottom');
                result.body.data.should.have.property('travel');
                result.body.data.name.should.equal(gatInksBlack.name);
                result.body.data.type.should.equal(gatInksBlack.type);
                result.body.data.actuation.should.equal(gatInksBlack.actuation);
                result.body.data.bottom.should.equal(gatInksBlack.bottom);
                result.body.data.travel.should.equal(gatInksBlack.travel);
                done();
            });
    });
    // Test GET Gateron Ink Red's details
    it ('should get Gateron Ink Red', function(done) {
        chai.request(app)
            .get('/api/switches/Gateron%20Ink%20Red')
            .end((error, result) => {
                result.should.have.status(200);
                result.body.message.should.equal("Gateron Ink Red has been found");
                result.body.data.should.have.property('name');
                result.body.data.should.have.property('type');
                result.body.data.should.have.property('actuation');
                result.body.data.should.have.property('bottom');
                result.body.data.should.have.property('travel');
                result.body.data.name.should.equal(gatInksRed.name);
                result.body.data.type.should.equal(gatInksRed.type);
                result.body.data.actuation.should.equal(gatInksRed.actuation);
                result.body.data.bottom.should.equal(gatInksRed.bottom);
                result.body.data.travel.should.equal(gatInksRed.travel);
                done();
            });
    });
});

// Test PUT to update switch
describe('PUT', () => {
    it('update Gateron Ink Black\'s information', function(done) {
        chai.request(app)
            .put('/api/switches/Gateron%20Ink%20Black')
            .set('content-type', 'application/json')
            .send(gatInksBlackWrong)
            .end((error, result) => {
                result.should.have.status(200);
                result.body.message.should.equal("Gateron Ink Black has been updated");
                result.body.data.should.have.property('name');
                result.body.data.should.have.property('type');
                result.body.data.should.have.property('actuation');
                result.body.data.should.have.property('bottom');
                result.body.data.should.have.property('travel');
                result.body.data.name.should.equal(gatInksBlackWrong.name);
                result.body.data.type.should.equal(gatInksBlackWrong.type);
                result.body.data.actuation.should.equal(gatInksBlackWrong.actuation);
                result.body.data.bottom.should.equal(gatInksBlackWrong.bottom);
                result.body.data.travel.should.equal(gatInksBlackWrong.travel);
                done();
            });
    }) 
})

// Test DELETE to remove switches
describe('DELETE', () => {
    it('should delete Gateron Ink Black', function(done) {
        chai.request(app)
        .delete('/api/switches/Gateron%20Ink%20Black')
        .end((error, result) => {
            result.should.have.status(200);
            result.body.message.should.equal('Switch deleted');
            done();
        });
    });
    it('should delete Gateron Ink Red', function(done) {
        chai.request(app)
            .delete('/api/switches/Gateron%20Ink%20Red')
            .end((error, result) => {
                result.should.have.status(200);
                result.body.message.should.equal('Switch deleted');
                done();
        });
    });
});

const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('POST /api/solve', function(){
        //Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Solve a puzzle with a valid puzzle string',function(done){
            chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.body.solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
                done();
            });
        });
        //Solve a puzzle with missing puzzle string: POST request to /api/solve
        test('Solve a puzzle with a missing puzzle string',function(done){
            chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field missing');
                done();
            });
        });
        //Solve a puzzle with invalid characters: POST request to /api/solve
        test('Solve a puzzle with invalid characters',function(done){
            chai.request(server)
            .post('/api/solve')
            .send({puzzle: 'zzzzz'})
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
        });
        //Solve a puzzle with incorrect length: POST request to /api/solve
        test('Solve a puzzle with incorrect length',function(done){
            chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
        });
        //Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Solve a puzzle that cannot be solved',function(done){
            chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            });
        });
    });

    suite('POST /api/check', function(){
        //Check a puzzle placement with all fields: POST request to /api/check
        test('Check a puzzle placement with all fields',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A3',
                value: '9'
            })
            .end((err, res) => {
                assert.equal(res.body.valid, true);
                done();
            });
        });
        //Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check a puzzle placement with single placement conflict',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '6'
            })
            .end((err, res) => {
                assert.equal(res.body.conflict[0], "column");
                done();
            });
        });
        //Check a puzzle placement with multiple placement conflicts: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflicts',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '9'
            })
            .end((err, res) => {
                assert.equal(res.body.conflict[0], "row");
                assert.equal(res.body.conflict[1], "region");
                done();
            });
        });
        //Check a puzzle placement with all placement conflicts: POST request to /api/check
        test('Check a puzzle placement with all placement conflicts',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '5'
            })
            .end((err, res) => {
                assert.equal(res.body.conflict[0], "row");
                assert.equal(res.body.conflict[1], "column");
                assert.equal(res.body.conflict[2], "region");
                done();
            });
        });
        //Check a puzzle placement with missing required fields: POST request to /api/check
        test('Check a puzzle placement with all placement conflicts',function(done){
            chai.request(server)
            .post('/api/check')
            .send({})
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
        });
        //Check a puzzle placement with invalid characters: POST request to /api/check
        test('Check a puzzle placement with invalid characters',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A3',
                value: '9'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
        });
        //Check a puzzle placement with incorrect length: POST request to /api/check
        test('Check a puzzle placement with incorrect length',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A3',
                value: '9'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
        });
        //Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Check a puzzle placement with invalid placement coordinate',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'P3',
                value: '9'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            });
        });
        //Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Check a puzzle placement with invalid placement value',function(done){
            chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A3',
                value: 'a'
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
        });
    });

});


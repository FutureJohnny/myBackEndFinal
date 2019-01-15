// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);

let login_details = {
    'email': 'email@email.com',
    'password': '123@abc'
}

describe('Create Account, Login and Check Token', () => {
    beforeEach((done) => {
        // Reset user mode before each test
        User.deleteMany({}, (err) => {
            console.log(err);
            done();
        })
    });

    describe('/POST Register', () => {
        it('it should Register, Login and check token', (done) => {
            chai.request(server)
                .post('/api/signup')
                .send(login_details)// This is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // When we get a response from the endpoint
                // The res object should have status of 200
                res.should.have.status(200);
                // Follow up with login
                chai.request(server)
                    .post('/api/signin')
                    .send(login_details)
                    .end((err, res) => {
                        console.log('This runs the login part');
                        res.should.have.status(200);
                        expect(res.body.success).to.be.true;
                        res.body.should.have.property('token');
                        let token = res.body.token;
                        // Follow up with requesting user protected page
                        chai.request(server)
                            .get('/api/film')
                            // We set the auth header with our token
                            .set('Authorization', token)
                            .end((err, res) => {
                                console.log('Testing token');
                                res.should.have.status(200);
                                res.body.should.be.a('array');
                                done(); // Don't forget the done callback to indicate we're done
                        })
                })

            })
        })
    })
});
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Film = require('../models/film');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();


chai.use(chaiHttp);

// Our parent block
describe('Film', () => {
    beforeEach((done) => {
        Film.deleteMany({}, (err) => {
            done();
        });
    });

    let ID;
    let testFilm = {
        "title": "Star Wars: Empire Strikes Back",
        "director": "George Lucas",
        "studio": "Lucas Film",
        "year": "1981\n",
        "review": "The 2nd Star Wars film.",
        "reviewer": "Allan",
        "image": "./images/test.png"
    };

    describe('/GET film', () => {
        it('It should GET all the films', (done) => {
            chai.request(server).get('/api/film').set({
                Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMzNWQ2NmE1NGJjNTEwYjg0NTc2MzZhIiwiZW1haWwiOiJhZG1pbkAxLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JG1NdnltaWNnRHQwOXM1V1NBYS9zaC5uL2ZtdTlLM0F4UmxsVXhzMzAzVmRHQTZTdVdwbnhHIiwiY3JlYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwidXBkYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwiX192IjowLCJpYXQiOjE1NDcwMzM4MzN9.HcEkySvYp4ycGl4AtJMSLE_Cd_Z9zYCQSWgP61z8k6Q'
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST film', () => {
        it('It should CREATE a new film', (done) => {
            chai.request(server).post('/api/film').send(testFilm).set({
                Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMzNWQ2NmE1NGJjNTEwYjg0NTc2MzZhIiwiZW1haWwiOiJhZG1pbkAxLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JG1NdnltaWNnRHQwOXM1V1NBYS9zaC5uL2ZtdTlLM0F4UmxsVXhzMzAzVmRHQTZTdVdwbnhHIiwiY3JlYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwidXBkYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwiX192IjowLCJpYXQiOjE1NDcwMzM4MzN9.HcEkySvYp4ycGl4AtJMSLE_Cd_Z9zYCQSWgP61z8k6Q'
            }).end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.success.valueOf(true);
                chai.request(server).get('/api/film').set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMzNWQ2NmE1NGJjNTEwYjg0NTc2MzZhIiwiZW1haWwiOiJhZG1pbkAxLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JG1NdnltaWNnRHQwOXM1V1NBYS9zaC5uL2ZtdTlLM0F4UmxsVXhzMzAzVmRHQTZTdVdwbnhHIiwiY3JlYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwidXBkYXRlZEF0IjoiMjAxOS0wMS0wOVQxMTowOTozMC42MjFaIiwiX192IjowLCJpYXQiOjE1NDcwMzM4MzN9.HcEkySvYp4ycGl4AtJMSLE_Cd_Z9zYCQSWgP61z8k6Q'
                }).end((err, res) => {
                    ID = res.body[0]._id;
                    console.log(ID);
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
            });
        });
    });
});
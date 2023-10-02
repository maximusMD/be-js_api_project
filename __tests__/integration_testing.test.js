const data = require('../db/data/test-data/index')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')

const endpoints = require('../endpoints.json')

beforeEach(() => seed(data))    
afterAll(() => db.end())

describe('General Errors', () => {
    it('should return a 404 if not found', () => {
        request(app).get('/api/notfound').expect(404).then((res) => {
            expect(res.body.message).toBe('Not Found')
        })
    })
});

describe('getTopics', () => {
    it('should return a 200 status code', () => {
        return request(app).get("/api/topics").expect(200)
    });
    it('should return the topics', () => {
        const expected = [
            { slug: 'mitch', description: 'The man, the Mitch, the legend' },
            { slug: 'cats', description: 'Not dogs' },
            { slug: 'paper', description: 'what books are made of' }
        ]
        return request(app).get('/api/topics').then((res) => {
            expect(res.body.topics).toEqual(expected)
        })
    });
});

describe('getAPI', () => {
    it('should return a 200 status code', () => {
        return request(app).get('/api').expect(200)
    });
    it('should return a description of all the available endpoints', () => {
        const expected = endpoints
        return request(app).get('/api').then((res) => {
            console.log(res.body);
            expect(res.body).toEqual(expected)
        })
    });
});
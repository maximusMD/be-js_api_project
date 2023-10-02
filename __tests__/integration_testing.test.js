const data = require('../db/data/test-data/index')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')

beforeEach(() => seed(data))    
afterAll(() => db.end())



describe('getTopics', () => {
    it('should return a 200 status code', () => {
        return request(app).get("/api/topics").expect(200)
    });
    it('should return the topics (an array of objects with the correct properties) ', () => {
        return request(app).get("/api/topics").then((res) => {
            expect(Array.isArray(res.body.topics)).toBe(true)
            res.body.topics.forEach((topic, index) => {
                expect(typeof res.body.topics[index]).toBe('object')
                expect(topic).hasOwnProperty('slug')
                expect(topic).hasOwnProperty('description')
            });
        })
    });
});
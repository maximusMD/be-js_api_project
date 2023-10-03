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
    it('should return the topics (an array of objects with the correct properties) ', () => {
        return request(app).get("/api/topics").then((res) => {
            expect(Array.isArray(res.body.topics)).toBe(true)
            expect(res.body.topics).toHaveLength(3)
            res.body.topics.forEach((topic, index) => {
                expect(typeof res.body.topics[index]).toBe('object')
                expect(topic).hasOwnProperty('slug')
                expect(topic).hasOwnProperty('description')
            });
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
            expect(res.body).toEqual(expected)
        })
    })
});

describe('getArticleByID', () => {
    it('should return a 200 status code', () => {
        return request(app).get("/api/articles/1").expect(200)
        
    });
    it('should return the correct article', () => {
        const expected = {
        author: 'butter_bridge',
        title: 'Living in the shadow of a great man',
        article_id: 1,
        body: 'I find this existence challenging',
        topic: 'mitch',
        created_at: '2020-07-09T20:11:00.000Z',
        votes: 100,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
        }
        return request(app).get("/api/articles/1").expect(200).then((res) => {
            expect(res.body.article).toEqual(expected)
        })
    });
    it('should return a 404 status code if no such article', () => {
        return request(app).get("/api/articles/5000").expect(404).then((res) => {
            expect(res.status).toBe(404)
            expect(res.body.message).toBe('Not Found')
        })
    });  
});

describe('getArticles', () => {
    it('should return a 200 status code', () => {
        return request(app).get("/api/articles").expect(200)
    });
    it('should return the articles (an array of objects with the correct properties) ', () => {
        return request(app).get("/api/articles").then((res) => {
            expect(Array.isArray(res.body.articles)).toBe(true)
            expect(res.body.articles).toHaveLength(13)
            res.body.articles.forEach((article, index) => {
                expect(typeof res.body.articles[index]).toBe('object')
                expect(article).hasOwnProperty('author')
                expect(article).hasOwnProperty('title')
                expect(article).hasOwnProperty('article_id')
                expect(article).hasOwnProperty('topic')
                expect(article).hasOwnProperty('created_at')
                expect(article).hasOwnProperty('votes')
                expect(article).hasOwnProperty('article_img_url')
                expect(article).hasOwnProperty('comment_count')
            });
        })
    });
    it('should not contain a body property in the articles', () => {
        return request(app).get("/api/articles").then((res) => {
            for (const article of res.body.articles) {
                expect(article.body).toBeUndefined();
            }
        })
    });
});
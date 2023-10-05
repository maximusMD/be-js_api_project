const data = require('../db/data/test-data/index')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')
require('jest-sorted')

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
                expect(article.article_id).toBe(res.body.articles[index].article_id)
            });
        })
    });
    it('should be sorted by created_at in descending order', () => {
        return request(app).get("/api/articles").then((res) => {
            expect(res.body.articles).toBeSortedBy('created_at', { descending: true})
        })
    });
    it('should not contain a body property in the articles', () => {
        return request(app).get("/api/articles").then((res) => {
            for (const article of res.body.articles) {
                expect(article.body).toBeUndefined();
            }
        })
    });
    it('should return filtered articles when a valid topic query is provided', () => {
        return request(app).get('/api/articles?topic=mitch').expect(200).then((res) => {
            expect(Array.isArray(res.body.articles)).toBe(true)
            expect(res.body.articles).toHaveLength(12)
            res.body.articles.forEach((article, index) => {
                expect(typeof res.body.articles[index]).toBe('object')
                expect(article).toHaveProperty('topic', 'mitch')
                expect(article).toHaveProperty('author')
                expect(article).toHaveProperty('title')
                expect(article).toHaveProperty('article_id')
                expect(article).toHaveProperty('created_at')
                expect(article).toHaveProperty('votes')
                expect(article).toHaveProperty('article_img_url')
                expect(article).toHaveProperty('comment_count')
            })
        })
    });
    it('should return a 200 status code if no articles for specified topic', () => {
        return request(app).get('/api/articles?topic=paper').expect(200).then((res) => {
            expect(res.body.message).toBe('No Articles for specified topic')
        })
    });
    it('should return a 404 status code if topic does not exist', () => {
        return request(app).get('/api/articles?topic=invalidTopic').expect(404).then((res) => {
            expect(res.body.message).toBe('Not Found')
        })
    });
    it('should return a 400 status code if topic is empty', () => {
        return request(app).get('/api/articles?topic=').expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    });
});

describe('getComments', () => {
    it('should return a 200 status code', () => {
        return request(app).get("/api/articles/1/comments").expect(200)
    });
    it('should return the articles (an array of objects with the correct properties) ', () => {
        return request(app).get("/api/articles/1/comments").then((res) => {
            expect(Array.isArray(res.body.comments)).toBe(true)
            expect(res.body.comments).toHaveLength(11)
            res.body.comments.forEach((comment, index) => {
                expect(typeof res.body.comments[index]).toBe('object')
                expect(comment).hasOwnProperty('author')
                expect(comment).hasOwnProperty('article_id')
                expect(comment).hasOwnProperty('created_at')
                expect(comment).hasOwnProperty('votes')
                expect(comment).hasOwnProperty('body')
            });
        })
    }); 
});

describe('postComments', () => {
    it('should return a 201 status code and the posted comment with the username, body, and article_id properties', () => {
        const comment = {username: 'butter_bridge', body: 'a'}
        return request(app).post(`/api/articles/1/comments`).send(comment).expect(201).then((res) => {
            expect(res.body.comment).toHaveProperty('author', 'butter_bridge')
            expect(res.body.comment).toHaveProperty('body', 'a')
            expect(res.body.comment).toHaveProperty('article_id', 1)
        })
    });
    it('should return a 201 status code and the posted comment with only the correct properties', () => {
        const comment = {username: 'butter_bridge', body: 'a', nonsense: 1}
        return request(app).post(`/api/articles/1/comments`).send(comment).expect(201).then((res) => {
            expect(res.body.comment).toHaveProperty('author', 'butter_bridge')
            expect(res.body.comment).toHaveProperty('body', 'a')
            expect(res.body.comment).toHaveProperty('article_id', 1)
            expect(res.body.comment.nonsense).toBeUndefined()
        })
    });
    it('should return a 400 status code if bad request, i.e. a missing required property', () => {
        const comment = {username: 'butter_bridge'}
        return request(app).post(`/api/articles/1/comments`).send(comment).expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    })
    it('should return a 400 status code if bad request, i.e. an invalid username', () => {
        const comment = {username: 1, body: 'a'}
        return request(app).post(`/api/articles/1/comments`).send(comment).expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    })
    it('should return a 404 status code if bad request, i.e. username doesn\'t exist', () => {
        const comment = {username: 'a', body: 'a'}
        return request(app).post(`/api/articles/1/comments`).send(comment).expect(404).then((res) => {
            expect(res.body.message).toBe('Not Found')
        })
    })
    it('should return a 404 status code if no such article', () => {
        const comment = {username: 'butter_bridge'}
        return request(app).post(`/api/articles/5000/comments`).send(comment).expect(404).then((res) => {
            expect(res.body.message).toBe('Not Found')
        })
    })
    it('should return a 400 status code if invalid article', () => {
        const comment = {username: 'butter_bridge'}
        return request(app).post(`/api/articles/a/comments`).send(comment).expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    })
});

describe('patchArticles', () => {
    it('should return a 200 status code and the updated article', (done) => {
        const inc_votes = 5
        request(app).patch('/api/articles/1').send({ inc_votes: inc_votes }).expect(200).then((res) => {
            expect(res.body.article).toHaveProperty('author', 'butter_bridge')
            expect(res.body.article).toHaveProperty('body', 'I find this existence challenging')
            expect(res.body.article).toHaveProperty('article_id', 1)
            expect(res.body.article).toHaveProperty('topic', 'mitch')
            expect(res.body.article).toHaveProperty('votes', 105)
            expect(res.body.article).toHaveProperty('article_img_url', 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
            done()
        })
    })
    it('should return a 404 status code if no such article', () => {
        const inc_votes = 5
        return request(app).patch('/api/articles/5000').send({ inc_votes: inc_votes }).expect(404).then((res) => {
            expect(res.body.message).toBe('Not Found')
        })
    })
    it('should return a 400 status code if inc_votes is not a number', () => {
        const inc_votes = 'a'
        return request(app).patch('/api/articles/1').send({ inc_votes: inc_votes }).expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    })
    it('should return a 400 status code if invalid article path', () => {
        const inc_votes = 5
        return request(app).patch('/api/articles/cheese').send({ inc_votes: inc_votes }).expect(400).then((res) => {
            expect(res.body.message).toBe('Bad Request')
        })
    })
});

describe('deleteComments', () => {
    it('should return a 204 status code', () => {
        return request(app).delete('/api/comments/1').expect(204)
    });
    it('should return a 404 status code if the comment does not exist', () => {
        return request(app).delete('/api/comments/5000').expect(404)
    });
    it('should return a 400 status code for an invalid comment_id', () => {
        return request(app).delete('/api/comments/a').expect(400)
    });
});

describe('getUsers', () => {
    it('should return the users (an array of objects with the correct properties) ', () => {
        return request(app).get("/api/users").then((res) => {
            expect(Array.isArray(res.body.users)).toBe(true)
            expect(res.body.users).toHaveLength(4)
            res.body.users.forEach((user, index) => {
                expect(typeof res.body.users[index]).toBe('object')
                expect(user).hasOwnProperty('username')
                expect(user).hasOwnProperty('name')
                expect(user).hasOwnProperty('avatar_url')
            });
        })
    });
});
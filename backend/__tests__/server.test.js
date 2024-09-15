const request = require('supertest');
const app = require('../server');

describe('POST /add', () => {
    it('should return 0 for an empty string', async () => {
        const res = await request(app).post('/add').send({ numbers: "" });
        expect(res.body.sum).toBe(0);
    });
    it('should return the number itself for a single number input', async () => {
        const res = await request(app).post('/add').send({ numbers: "5" });
        expect(res.body.sum).toBe(5);
    });
});
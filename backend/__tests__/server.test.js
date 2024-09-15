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
    it('should return the sum for multiple numbers', async () => {
        const res = await request(app).post('/add').send({ numbers: "1,2,3" });
        expect(res.body.sum).toBe(6);
    });
    it('should handle new lines as delimiters', async () => {
        const res = await request(app).post('/add').send({ numbers: "1\n2,3" });
        expect(res.body.sum).toBe(6);
    });
    it('should support custom delimiters', async () => {
        const res = await request(app).post('/add').send({ numbers: "//;\n1;2" });
        expect(res.body.sum).toBe(3);
    });
    it('should throw an error for negative numbers', async () => {
        const res = await request(app).post('/add').send({ numbers: "1,-2,3" });
        expect(res.status).toBe(400);
        expect(res.text).toBe("Negative numbers not allowed: -2");
    });     
});
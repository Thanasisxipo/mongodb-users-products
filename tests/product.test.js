const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/product.helper')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => { console.log("Connection to MongoDB established")},
            err => {console.log("Faild to connect to MongoDB", err)}
        )
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("Request GET /api/products", () => {
  it("Returns all products", async () => {
      const res = await request(app).get('/api/products')
      expect(res.statusCode).toBe(200)
      expect(res.body.data.length).toBeGreaterThan(0)
  }, 10000)
})

describe("Request GET /api/products/:id", () => {
  it("Returns a product", async () => {
      const result = await helper.findLastInsertedProduct()

      const res = await request(app).get('/api/products/' + result.id)
      expect(res.statusCode).toBe(200)
      expect(res.body.data.id).toBe(result.id)
  }, 10000)
})

describe("Request Post /api/products", () => {
  it("Creates a product", async () => {
      const res = await request(app)
      .post('/api/products')
      .send({
        product: "test",
        cost: 10,
        description: "test description",
        quantity: 10
      })
      expect(res.statusCode).toBe(200)
      expect(res.body.data).toBeTruthy()
  }, 10000)
})

describe("Request DELETE /api/products/:id", () => {
  it("Deletes a product", async () => {
      const result = await helper.findLastInsertedProduct()

      const res = await request(app).delete('/api/products/' + result.id)
      expect(res.statusCode).toBe(200)
  }, 10000)
})
import supertest from "supertest";
import { app, sequelize } from "../express";

describe("Product e2e tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const res = await supertest(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      })

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Product 1");
    expect(res.body.price).toBe(10);
  })

  it('should list all products', async () => {
    const res = await supertest(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      })

    expect(res.status).toBe(200);

    const res2 = await supertest(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 20,
      })

    expect(res2.status).toBe(200);

    const res3 = await supertest(app)
      .get("/product")

    expect(res3.status).toBe(200);
    expect(res3.body).toHaveLength(2);
  })
})
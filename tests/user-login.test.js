import supertest from "supertest"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"
import { createUserTest, removeTestUser } from "./test-util.js"

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createUserTest()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    })

    logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.token).toBeDefined()
    expect(typeof result.body.data.token).toBe("string")
    expect(result.body.data.token).not.toBe("test")
  })

  it("should reject login when username and password are empty", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah-password",
    })

    logger.info(result.body)

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when username is not registered", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "unknown_user",
      password: "rahasia",
    })

    logger.info(result.body)

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when username is missing", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      password: "rahasia",
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when password is missing", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when username is null", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: null,
      password: "rahasia",
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject login when password is null", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: null,
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

    it("should reject login when request contains unknown field", async () => {
    const result = await supertest(web).post("/api/users/login").send({
        username: "test",
        password: "rahasia",
        sus: "xxx",
    })

    logger.info(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
    })

    // ini berbahaya, gagal unit testnya
    it("should reject login when payload contains dangerous keys", async () => {
    const result = await supertest(web).post("/api/users/login").send({
        username: "test",
        password: "rahasia",
        __proto__: { isAdmin: true },
    })

    logger.info(result.body)

    expect([400, 401]).toContain(result.status)
    })

})
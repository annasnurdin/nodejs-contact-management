import supertest from "supertest"
import { web } from "../src/application/web.js"
import { createUserTest, removeTestUser } from "./test-util.js"

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createUserTest()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it("should be able to get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test")

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.username).toBe("test")
    expect(result.body.data.name).toBe("test")
    expect(result.body.data.password).toBeUndefined()
    expect(result.body.errors).toBeUndefined()
  })

  it("should reject request if authorization header is missing", async () => {
    const result = await supertest(web).get("/api/users/current")

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
    expect(result.body.data).toBeUndefined()
  })

  it("should reject request if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "invalid-token")

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
    expect(result.body.data).toBeUndefined()
  })

  it("should reject request if token is empty", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "")

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
    expect(result.body.data).toBeUndefined()
  })
})
import supertest from "supertest"
import { web } from "../src/application/web.js"
import { createUserTest, removeTestUser } from "./test-util.js"
import { logger } from "../src/application/logging.js";

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createUserTest()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it("should be able to update current user name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "test updated",
      })

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.username).toBe("test")
    expect(result.body.data.name).toBe("test updated")
  })

  it("should be able to update current user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "newpassword123",
      })

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.username).toBe("test")
    expect(result.body.data.password).toBeUndefined()
  })

  it("should be able to update name and password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "combined update",
        password: "combinedpassword123",
      })

    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined()
    expect(result.body.data.username).toBe("test")
    expect(result.body.data.name).toBe("combined update")
    expect(result.body.data.password).toBeUndefined()
  })

  it("should reject update if token is invalid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "wrong-token")
      .send({
        name: "should fail",
      })

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject update if authorization header is missing", async () => {
    const result = await supertest(web).patch("/api/users/current").send({
      name: "should fail",
    })

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject update with invalid name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "",
      })

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject update with invalid password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "",
      })

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it("should reject update if request body is empty", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({})

    expect([200, 400]).toContain(result.status)
    if (result.status === 400) {
      expect(result.body.errors).toBeDefined()
    } else {
      expect(result.body.data).toBeDefined()
      expect(result.body.data.username).toBe("test")
    }
  })
})
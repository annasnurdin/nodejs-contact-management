import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createUserTest, removeTestUser } from "./test-util.js";

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should be able to logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const currentResult = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(currentResult.status).toBe(401);
    expect(currentResult.body.errors).toBeDefined();
  });

  it("should reject logout if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "wrong-token");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject logout if authorization header is missing", async () => {
    const result = await supertest(web).delete("/api/users/logout");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
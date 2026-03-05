import supertest from "supertest"
import { prismaClient } from "../src/application/database.js"
import { web } from "../src/application/web.js"

describe('POST /api/users', function () {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "annas"
            }
        })
    })
    it('should can register user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "annas",
                password: "pass",
                name: "Annas Nurdin"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("annas")
        expect(result.body.data.name).toBe("Annas Nurdin")
        expect(result.body.data.password).toBeUndefined()
    })
})
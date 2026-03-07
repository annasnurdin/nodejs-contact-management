import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result // hasil return dari userService.login
        })
    } catch (e) {
        next(e) // ini menangkap dari error Promise return hasil userService.login
        
        /*
            Promise bisa di try catch, tapi pakai await dulu: 
            try {
                return await prismaClient.user.update({ <-- ini di await dulu, kalau ada error bisa di catch langsung
                    data: { token: token },
                    where: { username: user.username },
                    select: { token: true }
                })
            } catch (error) {
                throw new ResponseError(500, "Failed to update user token")
            }
        */
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}
export default {
    register,
    login,
    get
}
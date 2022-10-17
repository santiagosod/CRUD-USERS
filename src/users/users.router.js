const passport = require("passport")
const userServices = require("./users.services")
const router = require("express").Router()
require("../middlewares/auth.middleware")(passport)

//? Ruta raiz
router.get("/", userServices.getAllUsers)

//? Ruta de usuario logeado
router.route("/me")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getMyUser
    )
    .patch(
        passport.authenticate("jwt", { session: false })
    )
    .delete(
        passport.authenticate("jwt", {session: false}),
        userServices.deleteMyUser
    )

//? Rutas dinamicas por ID 
router.route("/:id")
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)


module.exports = router
const express = require('express')
const { signup_post, login_post, signout, verify_user } = require('../Controller/authController')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

//GET
router.get("/signout" ,signout)
router.get("/user", requireAuth ,verify_user)
// POST
router.post("/signup" ,signup_post)
router.post("/login", login_post)




module.exports = router

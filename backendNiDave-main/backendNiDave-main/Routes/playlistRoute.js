const {createPlaylist, getPlaylists, getOnePlaylist} = require("../Controller/playlistController")

const express = require('express')
const { requireAuth } = require("../middleware/auth")


const router = express.Router()

// GET
router.get("/", requireAuth ,getPlaylists )
router.get("/:playlistId", getOnePlaylist)

// POST
router.post("/", requireAuth ,createPlaylist )


module.exports = router

const PLAYLIST = require("../Models/playlistSchema");
const USER = require("../Models/authSchema")
const getPlaylists = async (req, res) => {
  try {
    const userPlaylists = await PLAYLIST.find({ owner: req.user.id });
    res.status(200).json(userPlaylists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPlaylist = async (req, res) => {
  console.log(req.user, req.body);
  try {
    const createdPlaylist = await PLAYLIST.create({
      playlist_name: req.body.playlist_name,
      songs: req.body.songs,
      owner: req.user.id,
    });
    res.status(200).json({ message: "playlist created" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOnePlaylist = async (req, res) => {
  const {playlistId} = req.params
  try {
    const playlist = await PLAYLIST.findById(playlistId);
    const playlist_owner_details = await USER.findById(playlist.owner);
    res.status(200).json({...playlist._doc, owner : playlist_owner_details.username});
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  createPlaylist,
  getPlaylists,
  getOnePlaylist
};

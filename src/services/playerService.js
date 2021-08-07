import user from "../models/user";

async function getAllPlayers() {
  return await user.findAll();
}

async function getPlayerById(id) {
  return await user.findById(id);
}

async function createPlayer(player) {
  return await user.save(player);
}

async function updatePlayer(player) {
  return await user.save(player);
}

async function deletePlayer(id) {
  return await user.remove(id);
}

export default {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

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

async function updatePlayer(id, playerChanges) {
  const foundPlayer = user.findById(id);

  if (foundPlayer) {
    let updated = {
      ...foundPlayer,
      ...playerChanges,
    };
    return await user.save(updated);
  }
  return undefined;
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

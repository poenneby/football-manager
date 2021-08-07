import pool from "../database";

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    nationality: row.nationality,
    dateOfBirth: row.date_of_birth,
    preferredFoot: row.preferred_foot,
    createdAt: row.created_at,
  };
}

async function findAll() {
  const query = "SELECT * FROM player";
  const client = await pool.connect();
  try {
    const { rows } = await client.query(query);
    return rows.map(mapRow);
  } finally {
    client.release();
  }
}

async function findById(id) {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM player where id = $1";
    const { rows } = await client.query(query, [id]);
    return rows.map(mapRow)[0];
  } finally {
    client.release();
  }
}

async function update(client, player) {
  return await client.query(
    `UPDATE player SET name = $2, nationality = $3, date_of_birth = $4, preferred_foot = $5, created_at = $6 WHERE id = $1`,
    [
      player.id,
      player.name,
      player.nationality,
      player.dateOfBirth,
      player.preferredFoot,
      player.createdAt,
    ]
  );
}

async function insert(client, player) {
  return await client.query(
    "INSERT INTO player (name, nationality, date_of_birth, preferred_foot, created_at) VALUES ($1, $2, $3, $4, $5)",
    [
      player.name,
      player.nationality,
      player.dateOfBirth,
      player.preferredFoot,
      new Date(),
    ]
  );
}

async function save(player) {
  const client = await pool.connect();
  try {
    const { rows } = player.id
      ? await update(client, player)
      : await insert(client, player);
    return rows.map(mapRow)[0];
  } finally {
    client.release();
  }
}

async function remove(id) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM player WHERE id = $1";
    return await client.query(query, [id]);
  } finally {
    client.release();
  }
}

export default {
  findAll,
  findById,
  save,
  remove,
};

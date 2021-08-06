import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function findAll() {
  const query = "SELECT * FROM player";
  const client = await pool.connect();
  try {
    const result = await client.query(query);
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      nationality: row.nationality,
      dateOfBirth: row.date_of_birth,
      preferredFoot: row.preferredFoot,
      createdAt: row.created_at,
    }));
  } finally {
    client.release();
  }
}

async function findById(id) {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM player where id = $1";
    const result = await client.query(query, [id]);
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      nationality: row.nationality,
      dateOfBirth: row.date_of_birth,
      preferredFoot: row.preferred_foot,
      createdAt: row.created_at,
    }))[0];
  } finally {
    client.release();
  }
}

async function save(player) {
  const client = await pool.connect();
  try {
    const insert = `INSERT INTO player (name, nationality, date_of_birth, preferred_foot, created_at) 
    VALUES ($1, $2, $3, $4, $5)`;
    const update = `UPDATE player SET name = $2, nationality = $3, date_of_birth = $4, preferred_foot = $5, created_at = $6 WHERE id = $1`;
    const result = player.id
      ? await client.query(update, [
          player.id,
          player.name,
          player.nationality,
          player.dateOfBirth,
          player.preferredFoot,
          player.createdAt,
        ])
      : await client.query(insert, [
          player.name,
          player.nationality,
          player.dateOfBirth,
          player.preferredFoot,
          new Date(),
        ]);
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      nationality: row.nationality,
      dateOfBirth: row.date_of_birth,
      preferredFoot: row.preferred_foot,
      createdAt: row.created_at,
    }));
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

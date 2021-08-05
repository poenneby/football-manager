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
  const query = "SELECT * FROM player where id = $1";
  const client = await pool.connect();
  try {
    const result = await client.query(query, [id]);
    return result.rows.map((row) => ({
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

export default {
  findAll,
  findById,
};


export const config = {
    port: process.env.DOCKER_PORT,
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    dbPort: process.env.PG_DOCKER_PORT,
};

export const env = {
  db: {
    host: process.env.DB_HOST || 'dpg-d2n66en5r7bs73f5nnog-a',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'vanessa_sql_user',
    password: process.env.DB_PASS || 'HywMnL4nthzGCyvBtiHohDGwN6L0Atqk',
    name: process.env.DB_NAME || 'vanessa_sql',
    ssl: process.env.DB_SSL === 'true' ? true : false,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || 'user_java',
        password: process.env.DB_PASS || '1523',
        name: process.env.DB_NAME || 'inventario_db',
        ssl: process.env.DB_SSL === 'true' ? true : false,
    },
    nodeEnv: process.env.NODE_ENV || 'development',
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../database/data-source");
(async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        await data_source_1.AppDataSource.runMigrations();
        await data_source_1.AppDataSource.destroy();
        console.log('✅ Migraciones ejecutadas');
    }
    catch (err) {
        console.error('❌ Error ejecutando migraciones', err);
        process.exit(1);
    }
})();

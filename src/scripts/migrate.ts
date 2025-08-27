import { AppDataSource } from '../database/data-source';

(async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    await AppDataSource.destroy();
    console.log('✅ Migraciones ejecutadas');
  } catch (err) {
    console.error('❌ Error ejecutando migraciones', err);
    process.exit(1);
  }
})();

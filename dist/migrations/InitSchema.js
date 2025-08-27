"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1710000000000 = void 0;
class InitSchema1710000000000 {
    constructor() {
        this.name = 'InitSchema1710000000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        sku VARCHAR(60) NOT NULL UNIQUE,
        price NUMERIC(12,2) DEFAULT 0 NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        await queryRunner.query(`
      CREATE TABLE inventory (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL DEFAULT 0
      );
    `);
        await queryRunner.query(`
      CREATE TABLE stock_movements (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        type VARCHAR(3) NOT NULL,
        quantity INT NOT NULL,
        note TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        // Trigger para updated_at
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION set_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_products_updated_at
      BEFORE UPDATE ON products
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TRIGGER IF EXISTS trg_products_updated_at ON products;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_updated_at;`);
        await queryRunner.query(`DROP TABLE IF EXISTS stock_movements;`);
        await queryRunner.query(`DROP TABLE IF EXISTS inventory;`);
        await queryRunner.query(`DROP TABLE IF EXISTS products;`);
    }
}
exports.InitSchema1710000000000 = InitSchema1710000000000;

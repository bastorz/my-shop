import {MigrationInterface, QueryRunner} from "typeorm";

export class addKeywordsField1698203266376 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, "customFieldsPrice" integer, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice" FROM "product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "product_option"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product_option" RENAME TO "product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsDescripcion_extra" varchar(255), "customFieldsEspecificaciones_del_producto" varchar(255), "customFieldsNormas_de_diseno" varchar(255), "customFieldsProceso_de_pedido" varchar(255), CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, "customFieldsPrice" double precision, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice" FROM "product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "product_option"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product_option" RENAME TO "product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_option" RENAME TO "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE TABLE "product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, "customFieldsPrice" integer, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice" FROM "temporary_product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "temporary_product"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsDescripcionextra" varchar(255), "customFieldsEspecificacionesdelproducto" varchar(255), "customFieldsNormasdediseno" varchar(255), "customFieldsProcesodepedido" varchar(255), CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "temporary_product"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_option" RENAME TO "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE TABLE "product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, "customFieldsPrice" integer, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId", "customFieldsPrice" FROM "temporary_product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
   }

}

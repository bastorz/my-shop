import {MigrationInterface, QueryRunner} from "typeorm";

export class addKeywordsField1698202711227 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, "customFieldsPrice" integer, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId" FROM "product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "product_option"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product_option" RENAME TO "product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a6debf9198e2fbfa006aa10d71"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_option" RENAME TO "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE TABLE "product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId" FROM "temporary_product_option"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product_option"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a6debf9198e2fbfa006aa10d71" ON "product_option" ("groupId") `, undefined);
   }

}

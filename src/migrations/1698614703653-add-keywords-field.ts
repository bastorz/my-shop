import {MigrationInterface, QueryRunner} from "typeorm";

export class addKeywordsField1698614703653 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_6901d8715f5ebadd764466f7bd"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_dc9ac68b47da7b62249886affb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_cbcd22193eda94668e84d33f18"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_77be94ce9ec650446617946227"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9f065453910ea77d4be8e92618"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_239cfca2a55b98b90b6bef2e44"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "quantity" integer NOT NULL, "orderPlacedQuantity" integer NOT NULL DEFAULT (0), "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sellerChannelId" integer, "shippingLineId" integer, "productVariantId" integer NOT NULL, "initialListPrice" integer, "listPrice" integer NOT NULL, "taxCategoryId" integer, "featuredAssetId" integer, "orderId" integer, "customFieldsHola" integer DEFAULT (300), CONSTRAINT "FK_6901d8715f5ebadd764466f7bde" FOREIGN KEY ("sellerChannelId") REFERENCES "channel" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_dc9ac68b47da7b62249886affba" FOREIGN KEY ("shippingLineId") REFERENCES "shipping_line" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_cbcd22193eda94668e84d33f185" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_77be94ce9ec6504466179462275" FOREIGN KEY ("taxCategoryId") REFERENCES "tax_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9f065453910ea77d4be8e92618f" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_line"("createdAt", "updatedAt", "quantity", "orderPlacedQuantity", "listPriceIncludesTax", "adjustments", "taxLines", "id", "sellerChannelId", "shippingLineId", "productVariantId", "initialListPrice", "listPrice", "taxCategoryId", "featuredAssetId", "orderId", "customFieldsHola") SELECT "createdAt", "updatedAt", "quantity", "orderPlacedQuantity", "listPriceIncludesTax", "adjustments", "taxLines", "id", "sellerChannelId", "shippingLineId", "productVariantId", "initialListPrice", "listPrice", "taxCategoryId", "featuredAssetId", "orderId", "customFieldsHola" FROM "order_line"`, undefined);
        await queryRunner.query(`DROP TABLE "order_line"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_line" RENAME TO "order_line"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6901d8715f5ebadd764466f7bd" ON "order_line" ("sellerChannelId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_dc9ac68b47da7b62249886affb" ON "order_line" ("shippingLineId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cbcd22193eda94668e84d33f18" ON "order_line" ("productVariantId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_77be94ce9ec650446617946227" ON "order_line" ("taxCategoryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9f065453910ea77d4be8e92618" ON "order_line" ("featuredAssetId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_239cfca2a55b98b90b6bef2e44" ON "order_line" ("orderId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_239cfca2a55b98b90b6bef2e44"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9f065453910ea77d4be8e92618"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_77be94ce9ec650446617946227"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_cbcd22193eda94668e84d33f18"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_dc9ac68b47da7b62249886affb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6901d8715f5ebadd764466f7bd"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_line" RENAME TO "temporary_order_line"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "quantity" integer NOT NULL, "orderPlacedQuantity" integer NOT NULL DEFAULT (0), "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sellerChannelId" integer, "shippingLineId" integer, "productVariantId" integer NOT NULL, "initialListPrice" integer, "listPrice" integer NOT NULL, "taxCategoryId" integer, "featuredAssetId" integer, "orderId" integer, "customFieldsHola" integer, CONSTRAINT "FK_6901d8715f5ebadd764466f7bde" FOREIGN KEY ("sellerChannelId") REFERENCES "channel" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_dc9ac68b47da7b62249886affba" FOREIGN KEY ("shippingLineId") REFERENCES "shipping_line" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_cbcd22193eda94668e84d33f185" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_77be94ce9ec6504466179462275" FOREIGN KEY ("taxCategoryId") REFERENCES "tax_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9f065453910ea77d4be8e92618f" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "order_line"("createdAt", "updatedAt", "quantity", "orderPlacedQuantity", "listPriceIncludesTax", "adjustments", "taxLines", "id", "sellerChannelId", "shippingLineId", "productVariantId", "initialListPrice", "listPrice", "taxCategoryId", "featuredAssetId", "orderId", "customFieldsHola") SELECT "createdAt", "updatedAt", "quantity", "orderPlacedQuantity", "listPriceIncludesTax", "adjustments", "taxLines", "id", "sellerChannelId", "shippingLineId", "productVariantId", "initialListPrice", "listPrice", "taxCategoryId", "featuredAssetId", "orderId", "customFieldsHola" FROM "temporary_order_line"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_line"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_239cfca2a55b98b90b6bef2e44" ON "order_line" ("orderId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9f065453910ea77d4be8e92618" ON "order_line" ("featuredAssetId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_77be94ce9ec650446617946227" ON "order_line" ("taxCategoryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cbcd22193eda94668e84d33f18" ON "order_line" ("productVariantId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_dc9ac68b47da7b62249886affb" ON "order_line" ("shippingLineId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6901d8715f5ebadd764466f7bd" ON "order_line" ("sellerChannelId") `, undefined);
   }

}

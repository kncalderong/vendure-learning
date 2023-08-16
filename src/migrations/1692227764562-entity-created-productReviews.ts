import {MigrationInterface, QueryRunner} from "typeorm";

export class entityCreatedProductReviews1692227764562 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "product_review" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "text" varchar NOT NULL, "rating" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product_review" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "text" varchar NOT NULL, "rating" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, CONSTRAINT "FK_06e7335708b5e7870f1eaa608d2" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product_review"("createdAt", "updatedAt", "text", "rating", "id", "productId") SELECT "createdAt", "updatedAt", "text", "rating", "id", "productId" FROM "product_review"`, undefined);
        await queryRunner.query(`DROP TABLE "product_review"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product_review" RENAME TO "product_review"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_review" RENAME TO "temporary_product_review"`, undefined);
        await queryRunner.query(`CREATE TABLE "product_review" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "text" varchar NOT NULL, "rating" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "product_review"("createdAt", "updatedAt", "text", "rating", "id", "productId") SELECT "createdAt", "updatedAt", "text", "rating", "id", "productId" FROM "temporary_product_review"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product_review"`, undefined);
        await queryRunner.query(`DROP TABLE "product_review"`, undefined);
   }

}

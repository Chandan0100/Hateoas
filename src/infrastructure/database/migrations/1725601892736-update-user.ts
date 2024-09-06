import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1725601892736 implements MigrationInterface {
    name = 'UpdateUser1725601892736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("uuid" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(50), "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a30dad6d75fab1162adb132f30e" UNIQUE ("amount"), CONSTRAINT "PK_1442fd7cb5e0b32ff5d0b6c13d0" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}

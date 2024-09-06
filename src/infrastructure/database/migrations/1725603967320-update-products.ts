import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProducts1725603967320 implements MigrationInterface {
    name = 'UpdateProducts1725603967320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "uuid" DROP DEFAULT`);
    }

}

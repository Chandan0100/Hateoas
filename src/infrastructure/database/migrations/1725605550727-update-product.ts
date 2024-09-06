import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1725605550727 implements MigrationInterface {
    name = 'UpdateProduct1725605550727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_3e59a34134d840e83c2010fac9a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_a30dad6d75fab1162adb132f30e"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_3e59a34134d840e83c2010fac9a"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_3e59a34134d840e83c2010fac9a"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_3e59a34134d840e83c2010fac9a" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_a30dad6d75fab1162adb132f30e" UNIQUE ("amount")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

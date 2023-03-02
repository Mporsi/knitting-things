import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1677775334616 implements MigrationInterface {
    name = 'migration1677775334616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pattern" ADD "created" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pattern" ADD "updated" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pattern" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "pattern" DROP COLUMN "created"`);
    }

}

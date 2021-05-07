import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePostsUserIdFkName1620361255040
  implements MigrationInterface {
  name = 'ChangePostsUserIdFkName1620361255040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_218b532ad8e6746f6bacad607cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" RENAME COLUMN "user_user_id" TO "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" RENAME COLUMN "user_id" TO "user_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_218b532ad8e6746f6bacad607cb" FOREIGN KEY ("user_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

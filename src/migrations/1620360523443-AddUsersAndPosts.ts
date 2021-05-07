import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersAndPosts1620360523443 implements MigrationInterface {
  name = 'AddUsersAndPosts1620360523443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "user_id" SERIAL NOT NULL, 
        "first_name" character varying, 
        "last_name" character varying, 
        CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" (
        "post_id" SERIAL NOT NULL, 
        "title" character varying NOT NULL, 
        "votes" integer, "user_user_id" integer, 
        CONSTRAINT "PK_e55cc433639d0e21c3dbf637bce" PRIMARY KEY ("post_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_218b532ad8e6746f6bacad607cb" FOREIGN KEY ("user_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_218b532ad8e6746f6bacad607cb"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

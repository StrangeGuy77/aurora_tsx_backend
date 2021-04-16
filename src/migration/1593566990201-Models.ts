import { MigrationInterface, QueryRunner } from 'typeorm';

export class Models1593566990201 implements MigrationInterface {
  name = 'Models1593566990201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(55) NOT NULL, "password" text NOT NULL, "username" character varying(55) NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "user_role" character varying NOT NULL DEFAULT 'unconfirmed', "profile_pic" character varying(255) NOT NULL DEFAULT 'default_profile_pic.png', "name" character varying(55), "lastname" character varying(55), "cellphone" character varying(55), "worksite" character varying(55), "company" character varying(55), "country" character varying(10), "github" character varying(55), "webpage" character varying(55), "show_public_name" boolean NOT NULL DEFAULT false, "show_public_email" boolean NOT NULL DEFAULT false, "show_public_location" boolean NOT NULL DEFAULT false, "followers" integer NOT NULL DEFAULT 0, "times_liked" integer NOT NULL DEFAULT 0, "times_posted" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(50) NOT NULL, "description" character varying(2000) NOT NULL, "author" character varying(30) NOT NULL, "price" double precision NOT NULL, "extension" character varying(5) NOT NULL, "publisher" character varying(50) NOT NULL, "writingYear" date NOT NULL, "categories" character varying array NOT NULL, "filename" character varying(50) NOT NULL, "views" integer NOT NULL DEFAULT 0, "likes" integer NOT NULL DEFAULT 0, "timesDownloaded" integer NOT NULL DEFAULT 0, "userId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "postId" uuid NOT NULL, "content" text NOT NULL, "timestamp" date NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "test_column" character varying(55) NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "payment_method" json NOT NULL, "currency" character varying(3) NOT NULL, "amount" integer NOT NULL, "name" character varying(55) NOT NULL, "description" character varying(55) NOT NULL, "userId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "softwares" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "devLanguages" character varying array NOT NULL, "frameworks" character varying array, "price" double precision NOT NULL, "filename" character varying(255) NOT NULL, "userUploaderName" character varying(255), "imageUrl" character varying(255), "views" integer NOT NULL DEFAULT 0, "likes" integer NOT NULL DEFAULT 0, "timesDownloaded" integer NOT NULL DEFAULT 0, "userId" uuid, CONSTRAINT "PK_08ad643d69b5f67c5ab1ba1ab39" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "wishlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "test_column" character varying(55) NOT NULL, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "softwares" ADD CONSTRAINT "FK_6c14cb87d54372edffed8a30906" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "softwares" DROP CONSTRAINT "FK_6c14cb87d54372edffed8a30906"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
    await queryRunner.query(`DROP TABLE "wishlist"`);
    await queryRunner.query(`DROP TABLE "softwares"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

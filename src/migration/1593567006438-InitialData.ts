import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialData1593567006438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users
    await queryRunner.query(
      `INSERT INTO public.users (id, email, password, username, confirmed, user_role, profile_pic, name, lastname, cellphone, worksite, company, country, github, webpage, show_public_name, show_public_email, show_public_location, followers, times_liked, times_posted, created_at, updated_at) VALUES ('2eaecce6-2c6d-4118-9eea-145525e2902f', 'jhonatanrg@live.com', '$2a$10$8GBnZYt3Vr83HA5qgAClS.apLRfeShDxhHiAGLwaZaIbih02veyJW', 'StrangeGuy77', false, 'unconfirmed', 'https://res.cloudinary.com/djnwy591r/image/upload/v1593134953/j8xjd3mdwayzerxu2v4u.jpg', null, null, null, null, null, null, null, null, false, false, false, 0, 0, 0, '2020-06-29 00:06:01.870231', '2020-06-29 00:06:01.870231');`
    );

    // Softwares
    await queryRunner.query(`INSERT INTO public.softwares (id, title, description, "devLanguages", frameworks, price, filename, "userUploaderName", "imageUrl", views, likes, "timesDownloaded", "userId", created_at, updated_at) VALUES ('87c8024c-15ef-4e79-a4e6-6d7e03503e67', 'Y', 'x', '{s}', null, 4, '5424849531284508.jpg', 'StrangeGuy77', 'https://res.cloudinary.com/djnwy591r/image/upload/v1593133863/i0s0qya9mpyfmf4hpcxv.jpg', 0, 0, 0, '2eaecce6-2c6d-4118-9eea-145525e2902f', '2020-06-29 00:04:19.152328', '2020-06-29 00:04:19.152328');
    INSERT INTO public.softwares (id, title, description, "devLanguages", frameworks, price, filename, "userUploaderName", "imageUrl", views, likes, "timesDownloaded", "userId", created_at, updated_at) VALUES ('19546250-8791-4b13-a1cf-c0996f913043', 'Rothbard', 'rothbard description', '{libertarianism}', null, 102, '5439187457784364.jpg', 'StrangeGuy77', 'https://res.cloudinary.com/djnwy591r/image/upload/v1593399922/tdyh6vvgivr6jyvirfbr.jpg', 0, 0, 0, '2eaecce6-2c6d-4118-9eea-145525e2902f', '2020-06-29 00:04:19.152328', '2020-06-29 00:04:19.152328');`);
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

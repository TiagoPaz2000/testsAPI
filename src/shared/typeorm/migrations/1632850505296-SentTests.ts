import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SentTests1632850505296 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sentTests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sender',
            type: 'int',
          },
          {
            name: 'receiver',
            type: 'varchar',
          },
          {
            name: 'testId',
            type: 'int',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'testId',
            referencedTableName: 'tests',
            referencedColumnNames: ['id'],
            columnNames: ['testId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sentTests');
  }
}

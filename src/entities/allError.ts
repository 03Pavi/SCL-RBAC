import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Error') // Specify the name of the database table
export class AllError {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Array of errors',
  })
  message: [string];

  @ApiProperty()
  @Column()
  error: string;

  @ApiProperty()
  @Column()
  statusCode: number;
}

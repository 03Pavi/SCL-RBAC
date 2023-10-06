import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveTypeDto } from './create-leave-type.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLeaveTypeDto extends PartialType(CreateLeaveTypeDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}

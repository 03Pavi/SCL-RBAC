import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LeaveType } from 'src/schema/leave-type.schema';
import { AllError } from 'src/entities/allError';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { LeaveTypeService } from './leave-type.service';
import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/model/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JsonWebGuard } from 'src/auth/guards/JsonWebToken.guard';

@ApiTags('Types')
@Controller('type')
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @ApiCreatedResponse({
    description: 'Leave Type Added Successfully!',
    type: LeaveType,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: AllError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Invalid request body',
    type: AllError,
  })
  @Roles(Role.ADMIN, Role.CONSUMER)
  @UseGuards(JsonWebGuard,RoleGuard)
  @Post()
  async create(
    @Res() response: Response,
    @Body(new ValidationPipe({ transform: true }))
    CreateLeaveType: CreateLeaveTypeDto,
  ) {
    if (!CreateLeaveType) {
      throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
    }
    // create service
    const leaveTypeData = await this.leaveTypeService.create(CreateLeaveType);

    if (leaveTypeData === null) {
      throw new HttpException('Type is already exists', HttpStatus.BAD_REQUEST);
    }
    if (!leaveTypeData) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response.status(HttpStatus.CREATED).json({
      message: 'Leave type Added Successfully!',
      leaveTypeData,
    });
  }

  // -------------
  @ApiOkResponse({
    description: 'Leave-type fetched successfullyn',
  })
  @ApiNoContentResponse({
    description: 'No leave-type data Found',
  })
  @Get()
  async findAll(@Res() response: Response) {
    const leaveTypedata = await this.leaveTypeService.findAll();

    if (!leaveTypedata.length) {
      throw new NotFoundException('No leave type data found');
    }

    return response.status(HttpStatus.OK).json({
      message: 'Leave type fetched successfully',
      leaveTypedata,
    });
  }

  // find by id

  @ApiOkResponse({
    description: 'Leave-type fetched successfully',
    type: LeaveType,
  })
  @ApiNoContentResponse({
    description: 'No leave-type data Found',
    type: AllError,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Leave-type ID',
    type: AllError,
  })
  @Get(':id')
  async findOne(
    @Res() response: Response,
    @Param('id', new ValidationPipe({ transform: true })) id: string,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid leave ID', HttpStatus.BAD_REQUEST);
    }

    const leaveTypedata = await this.leaveTypeService.findOne(id);

    if (!leaveTypedata) {
      throw new NotFoundException('No leave type data found');
    }

    return response.status(HttpStatus.OK).json({
      message: 'Leave type data fetched successfully',
      leaveTypedata,
    });
  }

  // update
  @ApiOkResponse({
    description: 'leave-type updated successfully',
    type: LeaveType,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: AllError,
  })
  @ApiNoContentResponse({
    description: 'No Leave-type found with given Id',
    type: AllError,
  })
  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id', new ValidationPipe({ transform: true })) id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateLeaveType: CreateLeaveTypeDto,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid leave ID', HttpStatus.BAD_REQUEST);
    }

    const LeaveData = await this.leaveTypeService.update(updateLeaveType, id);

    if (!LeaveData) {
      throw new NotFoundException('No leave type found');
    }

    return response.status(HttpStatus.OK).json({
      message: 'Leave type updated successfully',
      LeaveData,
    });
  }
  @ApiOkResponse({
    description: 'Leave type Deleted Successfully!',
  })
  @ApiBadRequestResponse({
    description: 'Invalid leave type ID',
    type: AllError,
  })
  @ApiNoContentResponse({
    description: 'Leave not found',
    type: AllError,
  })
  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id', new ValidationPipe({ transform: true })) id: string,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid leave ID', HttpStatus.BAD_REQUEST);
    }
    const LeaveData = await this.leaveTypeService.remove(id);

    if (!LeaveData || LeaveData.modifiedCount === 0) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Leave not found',
      });
    }
    return response.status(HttpStatus.OK).json({
      message: 'Leave Deleted Successfully!',
    });
  }
}

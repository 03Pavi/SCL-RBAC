import { Injectable } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveType } from 'src/schema/leave-type.schema';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectModel(LeaveType.name)
    private readonly LeaveTypeModel: Model<LeaveType>,
  ) {}
  async create(createLeaveType: CreateLeaveTypeDto): Promise<LeaveType> {
    try {
      const isThere = await this.LeaveTypeModel.findOne({
        name: createLeaveType.name,
      });
      if (!isThere) {
        const newLeaveType = await this.LeaveTypeModel.create(createLeaveType);
        return newLeaveType;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to add leave type');
    }
  }

  async findAll(): Promise<LeaveType[]> {
    return await this.LeaveTypeModel.find({ status: true });
  }

  async findOne(id: string): Promise<LeaveType | null> {
    return await this.LeaveTypeModel.findOne({
      _id: id,
      status: true,
    });
  }
  async update(updateLeaveType: CreateLeaveTypeDto, _id: string) {
    try {
      const leaveData: LeaveType = await this.LeaveTypeModel.findByIdAndUpdate(
        _id,
        updateLeaveType,
        { new: true },
      );

      return leaveData;
    } catch (err) {
      throw new Error('Failed to update leave type');
    }
  }

  async remove(id: string) {
    try {
      const leaveData = await this.LeaveTypeModel.updateOne(
        { _id: id, status: true },
        { $set: { status: false } },
      );
      return leaveData;
    } catch (err) {
      throw new Error('Failed to delete leave type');
    }
  }
}

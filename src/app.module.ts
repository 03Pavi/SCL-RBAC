import { Module } from '@nestjs/common';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { RoleGuard } from './auth/guards/role.guard';
import { UserModule } from './user/user.module';

dotenv.config();
@Module({
  imports: [
    LeaveTypeModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
  ],
  controllers: [],
  providers: [RoleGuard],
})
export class AppModule {}

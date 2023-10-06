import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/model/role.enum';
export const ROLE_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles); //role key and number of roles like admin ,user ,customer

import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from 'src/schema/user.schema';
dotenv.config();
export function generateJwtToken(payload: User): string {
  const newPayload = JSON.stringify(payload);
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(newPayload, secretKey);
  return token;
}

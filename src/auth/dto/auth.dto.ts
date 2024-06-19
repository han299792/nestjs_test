import { IsString } from "class-validator";

export class authdto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
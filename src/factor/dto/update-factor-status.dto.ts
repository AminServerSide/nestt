import { IsString, IsEnum } from 'class-validator';
import { FactorStatus } from '../entities/factor.entity';

export class UpdateFactorStatusDto {
  @IsEnum(FactorStatus)
  status: FactorStatus;
}

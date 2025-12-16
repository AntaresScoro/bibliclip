import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class GetClipsQueryDto {
  @IsOptional()
  @IsString()
  streamerName?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  isPublished?: boolean;
}

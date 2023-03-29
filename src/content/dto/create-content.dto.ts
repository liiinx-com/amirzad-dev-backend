import {
  IsInt,
  IsOptional,
  IsEnum,
  IsString,
  Max,
  MaxLength,
  Min,
  IsDate,
  MinLength,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { ContentTypes } from '../entities/content.entity';

export class CreateContentDto {
  @IsNotEmpty()
  @IsEnum(ContentTypes)
  contentType: ContentTypes;

  @IsInt({ message: 'Order should be a number' })
  @IsOptional()
  order?: number;

  @IsInt({ message: 'Rating should be a number' })
  @Min(0, { message: 'Min is 0' })
  @Max(10, { message: 'Max is 10' })
  @IsOptional()
  rating?: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  @MaxLength(100, {
    message: 'Title is too long',
  })
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(5, {
    message: 'Subtitle is too short',
  })
  @MaxLength(100, {
    message: 'Subtitle is too long',
  })
  subtitle?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, {
    message: 'SecondarySubtitle is too short',
  })
  @MaxLength(100, {
    message: 'SecondarySubtitle is too long',
  })
  secondarySubtitle?: string;

  @IsDate()
  @IsOptional()
  from?: Date;

  @IsDate()
  @IsOptional()
  to?: Date;

  @IsString()
  @IsOptional()
  iconName?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Content is too short',
  })
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  tags?: Array<string>;
}

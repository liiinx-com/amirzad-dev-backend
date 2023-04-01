import { Exclude, Type, Transform } from 'class-transformer';
import { ContentTypes } from '../entities/content.entity';
import { ApiProperty } from '@nestjs/swagger';
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
  IsPositive,
} from 'class-validator';

export class ContentResponseDto {
  constructor(partial: Partial<ContentResponseDto>) {
    Object.assign(this, partial);
  }

  id: string;

  @ApiProperty({
    enum: ContentTypes,
    enumName: 'ContentTypes',
  })
  contentType: ContentTypes;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  subtitle?: string;

  @ApiProperty({ required: false })
  secondarySubtitle?: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  tags?: Array<string>;

  @Exclude()
  updatedAt: Date;
  @Exclude()
  createdAt: Date;

  @ApiProperty({ required: false })
  iconName?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  videoUrl?: string;
}

export class ContentCreateDto {
  @IsNotEmpty()
  @IsEnum(ContentTypes)
  @ApiProperty({
    enum: ContentTypes,
    enumName: 'ContentTypes',
  })
  contentType: ContentTypes;

  @IsInt({ message: 'Order should be a number' })
  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  order?: number;

  @IsInt({ message: 'Rating should be a number' })
  @Min(0, { message: 'Min is 0' })
  @Max(10, { message: 'Max is 10' })
  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  rating?: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  @MaxLength(100, {
    message: 'Title is too long',
  })
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(5, {
    message: 'Subtitle is too short',
  })
  @MaxLength(100, {
    message: 'Subtitle is too long',
  })
  @ApiProperty({ required: false })
  subtitle?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, {
    message: 'SecondarySubtitle is too short',
  })
  @MaxLength(100, {
    message: 'SecondarySubtitle is too long',
  })
  @ApiProperty({ required: false })
  secondarySubtitle?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  from?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  to?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  iconName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  videoUrl?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Content is too short',
  })
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiProperty({ required: false })
  tags?: Array<string>;
}

import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ContentTypes {
  ABOUT = 'ABOUT',
  EDUCATION = 'EDUCATION',
  SKILLS = 'SKILLS',
  PROJECTS = 'PROJECTS',
  INTERESTS = 'INTERESTS',
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
}

@Entity()
export class Content extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ContentTypes,
    default: [ContentTypes.ABOUT],
  })
  contentType: ContentTypes;

  @Column({ default: 0 })
  order?: number;

  @Column({ nullable: true })
  rating?: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100, nullable: true })
  subtitle?: string;

  @Column({ length: 100, nullable: true, name: 'secondary_subtitle' })
  secondarySubtitle?: string;

  @Column({ nullable: true })
  from?: Date;

  @Column({ nullable: true })
  to?: Date;

  @Column({ nullable: true, name: 'icon_name' })
  iconName?: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl?: string;

  @Column({ nullable: true, name: 'video_url' })
  videoUrl?: string;

  @Column()
  content: string;

  @Column({ type: 'json', default: [] })
  tags?: Array<string>;
}

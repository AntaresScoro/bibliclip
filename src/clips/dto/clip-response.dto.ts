import { UserPublicDto } from '../../users/dto/user-public.dto';

export class ClipResponseDto {
  id: string;
  title: string;
  description?: string;
  url: string;
  duration: number;
  streamerName: string;
  isPublished: boolean;
  owner?: UserPublicDto;
  createdAt: string;
  updatedAt: string;
}

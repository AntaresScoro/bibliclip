import { ClipDocument } from '../schema/clip.schema';
import { toUserPublicDto } from '../../users/mapper/user-public.mapper';

export function toClipResponseDto(clip: ClipDocument) {
  const owner = clip.owner;
  const ownerDto =
    typeof owner == 'object' && 'email' in owner
      ? toUserPublicDto(owner as any)
      : undefined;

  return {
    id: clip._id.toString(),
    title: clip.title,
    description: clip.description,
    url: clip.url,
    duration: clip.duration,
    streamerName: clip.streamerName,
    isPublished: clip.isPublished,
    owner: ownerDto,
    createdAt: clip.createdAt.toISOString(),
    updatedAt: clip.updatedAt.toISOString(),
  };
}

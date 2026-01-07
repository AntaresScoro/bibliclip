import { UserDocument } from '../schema/user.schema';
import { UserPublicDto } from '../dto/user-public.dto';

export function toUserPublicDto(user: UserDocument): UserPublicDto {
  return {
    id: user._id.toString(),
    email: user.email,
    displayName: user.displayName,
  };
}

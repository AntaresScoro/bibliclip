import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clip, ClipDocument } from '../schema/clip.schema';
import { Model } from 'mongoose';

type RequestWithUser = {
  user: { userId: string };
  params: { id: string };
};

@Injectable()
export class ClipOwnerGuard implements CanActivate {
  constructor(
    @InjectModel(Clip.name) private readonly clipModel: Model<ClipDocument>,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: RequestWithUser) {
    const userId = request.user.userId;
    const clipId = request.params.id;

    const clip = await this.clipModel.findById(clipId).exec();
    if (clip && userId === String(clip.owner)) {
      return true;
    } else if (!clip) {
      throw new NotFoundException('Clip not found');
    }
    throw new ForbiddenException('You are not the owner of this clip');
  }
}

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable, throttleTime } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Clip, ClipDocument } from '../schema/clip.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClipOwnerGuard implements CanActivate {
  constructor(
    @InjectModel(Clip.name) private readonly clipModel: Model<ClipDocument>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  private async validateRequest(request: any) {
    const userId = request.user.userId;
    const clipId = request.params.id;

    const clip = await this.clipModel.findById(clipId).exec();
    if (clip && userId === String(clip.owner)) {
      return true;
    }
    throw new ForbiddenException();
  }
}

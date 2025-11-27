import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { Clip } from './interfaces/clip.interface';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  addClip(@Body() clip: any): any {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  getOneClip(@Param() params: any): any {
    return this.clipsService.findOne(Number(params.id));
  }

  @Get()
  getClips(): Clip[] {
    return this.clipsService.findAll();
  }
}

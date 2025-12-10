import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { GetClipsQueryDto } from './dto/get-clips-query.dto';
import { ClipDocument } from './schema/clip.schema';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  async create(@Body() clip: CreateClipDto): Promise<ClipDocument> {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.findOne(id);
  }

  @Get()
  async findAll(@Query() queryDto: GetClipsQueryDto): Promise<{
    data: ClipDocument[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pageCount: number;
    };
  }> {
    const clips = await this.clipsService.findAll(queryDto);
    return {
      data: clips.items,
      meta: {
        total: clips.total,
        page: clips.page,
        limit: clips.limit,
        pageCount: clips.pageCount,
      },
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.clipsService.delete(id);
    return { message: "L'élément à été supprimé" };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() clip: UpdateClipDto,
  ): Promise<ClipDocument> {
    return this.clipsService.updateOne(id, clip);
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.publish(id);
  }

  @Patch(':id/unpublish')
  async unpublish(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.unpublish(id);
  }
}

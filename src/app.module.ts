import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClipsModule } from './clips/clips.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClipsModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27018/nest-clips?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

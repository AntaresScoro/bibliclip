import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Clip, ClipDocument } from '../clips/schema/clip.schema';
import { Model } from 'mongoose';

async function bootstrap() {
  // 1. On démarre Nest en mode "application context" (pas de serveur HTTP)
  const app = await NestFactory.createApplicationContext(AppModule);

  // 2. On récupère le Model Mongoose associé à Clip
  const clipsModel = app.get<Model<ClipDocument>>(getModelToken(Clip.name));

  // 3. On exécute la migration : tous les docs sans isPublished => false
  const result = await clipsModel
    .updateMany(
      { isPublished: { $exists: false } },
      { $set: { isPublished: false } },
    )
    .exec();

  console.log(`Migration terminée, ${result.modifiedCount} clips mis à jour.`);

  // 4. On ferme proprement le contexte Nest
  await app.close();
}

bootstrap();

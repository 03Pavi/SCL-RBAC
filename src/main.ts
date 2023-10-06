import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'json-to-pretty-yaml';
import { Console } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();

  await app.listen(8080).then(() => {
    console.log('server is listening');
  }).catch((err) => {
    console.error('Error starting the server:', err);
  });
}
bootstrap();
// const config = new DocumentBuilder()
//   .setTitle('Leave Management')
//   .setDescription('The Leave Management API description')
//   .setVersion('1.0')
//   .build();
//   const document = SwaggerModule.createDocument(app, config);
//   fs.writeFileSync('./openapi.json', JSON.stringify(document));
  
//   const data = YAML.stringify(document);
//   fs.writeFile('openapi.yaml', data, (err) => {
//     console.log("object")
//     if (err) console.log(err);
//     else {
//       console.log('swagger.yaml file has been updated successfully\n');
//     }
//   });
//   SwaggerModule.setup('api', app, document);

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Pattern } from "./src/app/pattern/entities/pattern.entity";

config();

const configService = new ConfigService();
const migrationsFolder = __dirname + '/src/migrations/*{.ts,.js}'
console.log(migrationsFolder);
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  migrations: [migrationsFolder],
  entities: [Pattern],
});

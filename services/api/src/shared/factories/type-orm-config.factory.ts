import { EnvService } from '../services/env.service';
import { ConfigService } from '@nestjs/config';

export default (configService?: ConfigService | EnvService): any => {
  if (!configService) configService = new EnvService();

  const connection = {
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
  };

  return {
    type: 'postgres',
    ...connection,
    ssl: {
      rejectUnauthorized: false,
      ca: configService.get('DB_CA_CERT'),
    },
    entities: [],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
    synchronize: true,
    // synchronize: configService.get('DB_SYNC'),
    logging: false,
  };
};

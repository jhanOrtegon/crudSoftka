import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'space-ships',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ShipsModule,
  ],
})
export class AppModule {}

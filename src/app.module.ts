import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DbModule from '@/modules/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DbModule.forRoot(),
  ],
})
export class AppModule {}

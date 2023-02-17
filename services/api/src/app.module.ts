import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [TypeOrmModule.forRoot({}), InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

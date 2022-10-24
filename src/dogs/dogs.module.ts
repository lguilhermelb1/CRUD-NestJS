import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  providers: [DogsService],
  controllers: [DogsController],
  exports: [DogsService]
})
export class DogsModule { }

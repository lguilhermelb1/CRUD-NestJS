import { Module } from '@nestjs/common';
import { PersonsService } from './persons/persons.service';
import { PersonsModule } from './persons/persons.module';
import { DogsService } from './dogs/dogs.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [PersonsModule, DogsModule],
  controllers: [],
  providers: [PersonsService, DogsService],
})
export class AppModule { }

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GenericCommandResult } from 'src/result/GenericCommandResult.interface';
import { DogModel } from './dogs.interface';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) { }

    @Get()
    public getAll(): GenericCommandResult {
        return this.dogsService.getAll();
    }

    @Get(':id')
    public getById(@Param('id', ParseIntPipe) id: number): GenericCommandResult {
        return this.dogsService.getById(id);
    }

    @Post()
    public create(@Body() dog: DogModel): GenericCommandResult {
        return this.dogsService.create(dog);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number): GenericCommandResult {
        return this.dogsService.delete(id);
    }

    @Put(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() dog: DogModel): GenericCommandResult {
        return this.dogsService.update(id, dog);
    }
}

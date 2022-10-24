import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GenericCommandResult } from 'src/result/GenericCommandResult.interface';
import { PersonModel } from './persons.interface';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) { }

    @Get()
    public getAll(): GenericCommandResult {
        return this.personsService.getAll();
    }

    @Get(':id')
    public getById(@Param('id', ParseIntPipe) id: number): GenericCommandResult {
        return this.personsService.getById(id);
    }

    @Post()
    public create(@Body() person: PersonModel): GenericCommandResult {
        return this.personsService.create(person);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number): GenericCommandResult {
        return this.personsService.delete(id);
    }

    @Put(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() person: PersonModel): GenericCommandResult {
        return this.personsService.update(id, person);
    }
}

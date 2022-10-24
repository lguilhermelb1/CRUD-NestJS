import { Logger, Injectable } from '@nestjs/common';
import { GenericCommandResult } from 'src/result/GenericCommandResult.interface';
import { PersonModel } from './persons.interface';

@Injectable()
export class PersonsService {

    private persons: Array<PersonModel> = [];
    private readonly logger = new Logger(PersonsService.name);

    //Serviços
    public getAll(): GenericCommandResult {
        this.logger.log('Retornando todas as pessoas.');
        const result: GenericCommandResult = {
            success: true,
            data: this.persons
        };
        return result;
    }

    public getById(id: number): GenericCommandResult {
        const person: PersonModel = this.persons.find(person => person.id === id);

        if (!person) {
            const result: GenericCommandResult = {
                success: false,
                data: 'Pessoa não encontrada.'
            };

            return result;
        } else {

            const result: GenericCommandResult = {
                success: true,
                data: person
            };

            return result;
        }
    }

    public create(person: PersonModel): GenericCommandResult {
        //Verifica se o nome inserido já existe em outra pessoa
        const nomeExists: boolean = this.persons.some(
            (item) => item.nome === person.nome,
        );

        if (nomeExists) {

            const result: GenericCommandResult = {
                success: false,
                data: 'O nome já existe.'
            };

            return result;
        } else {

            //Procura ID para a nova pessoa 
            const maxId: number = Math.max(...this.persons.map((person) => person.id), 0);
            const id: number = maxId + 1;

            const newPerson: PersonModel = {
                ...person,
                id,
            };

            this.persons.push(newPerson);

            const result: GenericCommandResult = {
                success: true,
                data: newPerson
            };

            return result;
        }
    }

    public delete(id: number): GenericCommandResult {
        const index: number = this.persons.findIndex(person => person.id === id);

        //Se retornar -1 é porque não foi encontrado no findIndex()
        if (index === -1) {

            const result: GenericCommandResult = {
                success: false,
                data: 'Pessoa não encontrado.'
            };

            return result;

        } else {

            this.persons.splice(index, 1);

            const result: GenericCommandResult = {
                success: true,
                data: 'Pessoa deletada.'
            };

            return result;
        }
    }

    public update(id: number, person: PersonModel): GenericCommandResult {
        this.logger.log(`Atualizando pessoa com o id: ${id}`);

        const index: number = this.persons.findIndex((person) => person.id === id);

        //Se retornar -1 é porque não foi encontrado no findIndex()
        if (index === -1) {
            const result: GenericCommandResult = {
                success: false,
                data: 'Pessoa não encontrada.'
            };

            return result;
        }

        //Verifica se o titulo inserido já existe em outra pessoa
        const nomeExists: boolean = this.persons.some(
            (item) => item.nome === person.nome && item.id !== id,
        );

        if (nomeExists) {

            const result: GenericCommandResult = {
                success: false,
                data: 'O nome já existe.'
            };

            return result;

        } else {

            const newPerson: PersonModel = {
                ...person,
                id,
            };

            this.persons[index] = newPerson;

            const result: GenericCommandResult = {
                success: true,
                data: newPerson
            };

            return result;

        }
    }
}
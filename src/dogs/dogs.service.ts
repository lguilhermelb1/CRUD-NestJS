import { Injectable, Logger } from '@nestjs/common';
import { GenericCommandResult } from 'src/result/GenericCommandResult.interface';
import { DogModel } from './dogs.interface';

@Injectable()
export class DogsService {
    private dogs: Array<DogModel> = [];
    private readonly logger = new Logger(DogsService.name);

    //Serviços
    public getAll(): GenericCommandResult {
        this.logger.log('Retornando todos ao cachorros.');
        const result: GenericCommandResult = {
            success: true,
            data: this.dogs
        };
        return result;
    }

    public getById(id: number): GenericCommandResult {
        const dog: DogModel = this.dogs.find(dog => dog.id === id);

        if (!dog) {
            const result: GenericCommandResult = {
                success: false,
                data: 'Cachorro(a) não encontrada.'
            };

            return result;
        } else {

            const result: GenericCommandResult = {
                success: true,
                data: dog
            };

            return result;
        }
    }

    public create(dog: DogModel): GenericCommandResult {
        //Verifica se o nome inserido já existe em outro(a) cachorro(a)
        const nomeExists: boolean = this.dogs.some(
            (item) => item.nome === dog.nome,
        );

        if (nomeExists) {

            const result: GenericCommandResult = {
                success: false,
                data: 'O nome já existe.'
            };

            return result;
        } else {

            //Procura ID para o(a) novo(a) cachorro(a)
            const maxId: number = Math.max(...this.dogs.map((dog) => dog.id), 0);
            const id: number = maxId + 1;

            const newDog: DogModel = {
                ...dog,
                id,
            };

            this.dogs.push(newDog);

            const result: GenericCommandResult = {
                success: true,
                data: newDog
            };

            return result;
        }
    }

    public delete(id: number): GenericCommandResult {
        const index: number = this.dogs.findIndex(dog => dog.id === id);

        //Se retornar -1 é porque não foi encontrado no findIndex()
        if (index === -1) {

            const result: GenericCommandResult = {
                success: false,
                data: 'Cachorro(a) não encontrado.'
            };

            return result;

        } else {

            this.dogs.splice(index, 1);

            const result: GenericCommandResult = {
                success: true,
                data: 'Cachorro(a) deletada.'
            };

            return result;
        }
    }

    public update(id: number, dog: DogModel): GenericCommandResult {
        this.logger.log(`Atualizando cachorro(a) com o id: ${id}`);

        const index: number = this.dogs.findIndex((dog) => dog.id === id);

        //Se retornar -1 é porque não foi encontrado no findIndex()
        if (index === -1) {
            const result: GenericCommandResult = {
                success: false,
                data: 'Cachorro(a) não encontrada.'
            };

            return result;
        }

        //Verifica se o titulo inserido já existe em outro(a) cachorro(a)
        const nomeExists: boolean = this.dogs.some(
            (item) => item.nome === dog.nome && item.id !== id,
        );

        if (nomeExists) {

            const result: GenericCommandResult = {
                success: false,
                data: 'O nome já existe.'
            };

            return result;

        } else {

            const newDog: DogModel = {
                ...dog,
                id,
            };

            this.dogs[index] = newDog;

            const result: GenericCommandResult = {
                success: true,
                data: newDog
            };

            return result;

        }
    }
}

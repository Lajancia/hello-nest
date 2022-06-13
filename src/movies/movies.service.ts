import { Injectable, NotFoundException, Patch } from '@nestjs/common';
// import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    
    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === +id);
        if (!movie){
            throw new NotFoundException(`movie with id ${id} not found`);
        }
        return movie;
    }

    deleteOne(id: string){
        this.getOne(id)
        this.movies=this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
                ...movieData
        })
    }

    update(id: string, updateData) {
        const movie=this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}

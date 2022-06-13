import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}
    
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }
    // @Get("search")
    // search(@Query("year") searchingYear:string){
    //     return `we are searching for a movie with a title: ${searchingYear}`
    // }

    @Get(':id')
    getOne(@Param('id') id:string):Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }
    
    @Delete("/:id")
    remove(@Param('id') id:string){
        return this.moviesService.deleteOne(id);
    }

    @Patch('/:id')
    patch(@Param('id') id: string, @Body() updateData) {
        return this.moviesService.update(id, updateData);
    }

    
    

    
}


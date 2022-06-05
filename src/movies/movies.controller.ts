import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return "this will return all movies";
    }
    @Get("search")
    search(@Query("year") searchingYear:string){
        return `we are searching for a movie with a title: ${searchingYear}`
    }

    @Get("/:id")
    getOne(@Param('id') id:string) {
        return `this will return one movie with the id: ${id}`;
    }

    @Post()
    create(@Body() movieData) {
        return movieData;
    }
    
    @Delete("/:id")
    remove(@Param('id') id:string){
        return `this will delete a movie id: ${id}`;
    }

    @Patch('/:id')
    patch(@Param('id') id: string, @Body() updateData) {
        return {
            updatedMovie: id,
            updateData,
        }
    }

    
    

    
}


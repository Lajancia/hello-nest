import { PartialType } from "@nestjs/mapped-types";
import { IsString,IsNumber } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto){

}
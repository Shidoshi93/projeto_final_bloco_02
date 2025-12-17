import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'Nome da categoria', minLength: 1, maxLength: 100 })
    @IsNotEmpty({ message: 'name should not be empty' })
    @Length(1, 100, { message: 'name should be between 1 and 100 characters' })
    name: string;

    @ApiProperty({ description: 'Descrição da categoria', minLength: 1, maxLength: 255 })
    @IsNotEmpty({ message: 'description should not be empty' })
    @Length(1, 255, { message: 'description should be between 1 and 255 characters' })
    description: string;

    @ApiProperty({ description: 'Status da categoria (ativo ou inativo)' })
    @IsNotEmpty({ message: 'isActive should not be empty' })
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive: boolean;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 100)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 255)
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}
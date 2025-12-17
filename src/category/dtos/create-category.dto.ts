import { IsBoolean, IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @Length(1, 100)
    name: string;

    @IsNotEmpty()
    @Length(1, 255)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}
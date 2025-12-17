import { IsBoolean, Length } from "class-validator";

export class UpdateCategoryDto {
    @Length(1, 100)
    name?: string;

    @Length(1, 255)
    description?: string;

    @IsBoolean()
    isActive?: boolean;
}
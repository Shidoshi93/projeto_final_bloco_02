import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, Length } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty()
    @Length(1, 100)
    name?: string;

    @ApiProperty()
    @Length(1, 255)
    description?: string;

    @ApiProperty()
    @IsBoolean()
    isActive?: boolean;
}
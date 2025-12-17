import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, Length } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @Length(1, 100)
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Length(1, 255)
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
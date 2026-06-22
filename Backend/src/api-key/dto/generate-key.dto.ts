import { ApiProperty } from '@nestjs/swagger';

export class GenerateKeyDto {
    @ApiProperty()
    service: string;
}
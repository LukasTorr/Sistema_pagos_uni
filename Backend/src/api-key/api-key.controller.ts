import { Controller, Post, Body } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { UseGuards, Get } from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key.guard';
import { GenerateKeyDto } from './dto/generate-key.dto';

@Controller('auth')
export class ApiKeyController {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @Post('generate-key')
    generate(@Body() dto: GenerateKeyDto) {
        return this.apiKeyService.generateApiKey(dto.service);
    }

    @UseGuards(ApiKeyGuard)
    @Get('/protected')
    getData() {
        return 'Acceso permitido con API Key';
}
}


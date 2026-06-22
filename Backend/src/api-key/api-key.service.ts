import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class ApiKeyService {
    constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepo: Repository<ApiKey>,
) {}

    async generateApiKey(service: string) {
    // 1. generar key real (solo se muestra una vez)
        const rawKey = `pk_${service.toLowerCase()}_${randomBytes(32).toString('hex')}`;

    // 2. hashear key (esto es lo que se guarda)
        const hash = createHash('sha256').update(rawKey).digest('hex');

    // 3. guardar en BD SOLO hash
        const apiKey = this.apiKeyRepo.create({
            service,
            privateKeyHash: hash,
        });

    await this.apiKeyRepo.save(apiKey);

    // 4. devolver SOLO la key original (una vez)
    return {
        apiKey: rawKey,
        service,
    };
}
}
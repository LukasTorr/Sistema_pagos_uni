import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/api-key.entity';
import { createHash } from 'crypto';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepo: Repository<ApiKey>,
) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const key = req.headers['x-api-key'];
    if (!key) return false;

    // 1. hashear lo que llega del cliente
    const hash = createHash('sha256').update(key).digest('hex');

    // 2. buscar en BD por hash
    const found = await this.apiKeyRepo.findOne({
        where: { privateKeyHash: hash },
    });
    console.log('API KEY GUARD EJECUTÁNDOSE');

    if (!found) return false;

    return true;
}
}
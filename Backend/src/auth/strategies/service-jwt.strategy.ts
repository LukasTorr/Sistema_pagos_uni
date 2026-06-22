import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport/dist/passport/passport.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceJwtStrategy extends PassportStrategy(Strategy, 'service-jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        if (payload.type !== 'service') {
            throw new UnauthorizedException();
        }

    return {
        serviceId: payload.sub,
        service: payload.service,
        type: 'service',
    };
}
}
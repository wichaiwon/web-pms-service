import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET || 'defaultSecretKey';
    console.log('🔐 JwtStrategy initialized with secret:', secret.substring(0, 10) + '...');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

async validate(payload: { sub: string; username: string; role: string }) {
    console.log('✅ JWT payload validated:', payload);
    if (!payload) {
        throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username, role: payload.role };
}
}

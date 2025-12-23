import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET || 'defaultSecretKey';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

async validate(payload: { sub: string; username: string; role: string }) {
    if (!payload) {
        throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username, role: payload.role };
}
}

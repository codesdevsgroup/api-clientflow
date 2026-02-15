import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret', // fallback for dev
    });
  }

  async validate(payload: UserPayload) {
    // Optimization: Return user data directly from JWT payload to avoid DB query on every request.
    // This makes the authentication process stateless and significantly faster.
    // The payload contains: sub (id), email, username, and role.
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };
  }
}

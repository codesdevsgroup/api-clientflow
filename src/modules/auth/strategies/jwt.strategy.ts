import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret', // fallback for dev
    });
  }

  async validate(payload: UserPayload) {
    // We can fetch the user from DB to ensure they still exist and have the role
    const user = await this.userService.findOneUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }
    // Check if role still matches if needed, but payload role is usually enough for stateless jwt
    // However, if we want strict control (e.g. revoke admin), checking DB is safer.
    // For now, simple user check is enough.
    return user;
  }
}

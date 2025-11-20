import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { AppException } from 'src/common/exceptions/app.exception';
import { UserTokensService } from 'src/modules/user-tokens/user-tokens.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {
    constructor(
        private readonly userService: UsersService,
        private readonly tokensService: UserTokensService,
        private readonly jwtService: JwtService,
        private readonly i18n: I18nService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new AppException(this.i18n.t('messages.unauthorized'), 401);
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);

            const user = await this.userService.findById(payload.id);

            if (
                !user ||
                user.status !== 'active' ||
                !user.dataCompleted ||
                !user.isVerified
            ) {
                throw new AppException(
                    this.i18n.t('messages.unauthorized'),
                    401,
                );
            }

            const tokenExists = await this.tokensService.findOne({
                user: user.id,
                token,
            });

            if (!tokenExists) {
                throw new AppException(
                    this.i18n.t('messages.unauthorized'),
                    401,
                );
            }

            request['user'] = user;

            return true;
        } catch (error) {
            console.log(error);
            throw new AppException(this.i18n.t('messages.unauthorized'), 401);
        }
    }
}

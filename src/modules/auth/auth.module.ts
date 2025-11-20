import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthHelper } from './helpers/auth.helper';
import { CountriesModule } from '../countries/countries.module';
import { DevicesModule } from '../devices/devices.module';
import { UserTokensModule } from '../user-tokens/user-tokens.module';
import { AuthenticaModule } from 'src/services/authentica/authentica.module';
import { NodeMailerModule } from 'src/services/nodemailer/mailer.module';
import { Duplicate } from './validation/duplicate';
import { PasswordsMatch } from './validation/passwords-match';
import { ValidCountry } from './validation/valid-country';
import { AuthenticateGuard } from './guards/authenticate.guard';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        CountriesModule,
        DevicesModule,
        UserTokensModule,
        AuthenticaModule,
        NodeMailerModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthHelper,
        Duplicate,
        PasswordsMatch,
        ValidCountry,
        AuthenticateGuard,
    ],
    exports: [AuthService, AuthHelper],
})
export class AuthModule {}

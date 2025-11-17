import { Module } from '@nestjs/common';
import { i18nModule } from './core/i18n/i18n.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { databaseRootModule } from './core/database/database-root.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AdminsModule } from './modules/admins/admins.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DevicesModule } from './modules/devices/devices.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserTokensModule } from './modules/user-tokens/user-tokens.module';
import { cacheModule } from './core/cache/cache.module';
import { configModule } from './core/config/config.module';
import { jwtModule } from './core/jwt/jwt.module';
import { AuthModule } from './modules/auth/auth.module';
import { NodeMailerModule } from './services/nodemailer/mailer.module';
import { AuthenticaModule } from './services/authentica/authentica.module';
import { SharedModule } from './common/modules/shared-module';
import { UsersCommonModule } from './modules/users-common/users-common.module';

@Module({
    imports: [
        configModule,
        i18nModule,
        databaseRootModule,
        cacheModule,
        jwtModule,
        AdminsModule,
        CountriesModule,
        DevicesModule,
        RolesModule,
        SettingsModule,
        UserTokensModule,
        UsersModule,
        AuthModule,
        NodeMailerModule,
        AuthenticaModule,
        SharedModule,
        UsersCommonModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}

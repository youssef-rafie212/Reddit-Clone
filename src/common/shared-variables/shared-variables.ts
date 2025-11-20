import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedVariables {
    constructor(private readonly configService: ConfigService) {}

    get ADDRESS(): string {
        const env = this.configService.get<string>('NODE_ENV');
        const addressDev = this.configService.get<string>('ADDRESS_DEV');
        const addressProd = this.configService.get<string>('ADDRESS_PROD');
        return env === 'development' ? addressDev! : addressProd!;
    }

    get USER_AVATAR_IMAGES(): string {
        return '/uploads/users/avatars/';
    }

    get COUNTRY_IMAGES(): string {
        return '/uploads/countries/';
    }

    get POST_MEDIA(): string {
        return '/uploads/posts/';
    }

    get COMMUNITY_AVATAR_IMAGES(): string {
        return '/uploads/communities/avatars/';
    }
}

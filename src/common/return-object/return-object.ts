import { UserDocument } from 'src/modules/users/entities/user.entity';
import { SharedVariables } from '../shared-variables/shared-variables';
import { Injectable } from '@nestjs/common';
import { CountryDocument } from 'src/modules/countries/entities/country.entity';

@Injectable()
export class ReturnObject {
    constructor(private readonly sharedVariables: SharedVariables) {}

    getUserAvatar(avatar: string | null) {
        return avatar === '' || avatar === null
            ? this.sharedVariables.ADDRESS +
                  this.sharedVariables.USER_AVATAR_IMAGES +
                  'default.png'
            : avatar.startsWith('https')
              ? avatar
              : this.sharedVariables.ADDRESS +
                this.sharedVariables.USER_AVATAR_IMAGES +
                avatar;
    }

    getCountryImage(image: string) {
        return (
            this.sharedVariables.ADDRESS +
            this.sharedVariables.COUNTRY_IMAGES +
            image
        );
    }

    user(user: UserDocument) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: this.getUserAvatar(user.avatar),
            country:
                user.country && this.country(user.country as CountryDocument),
        };
    }

    country(country: CountryDocument) {
        return {
            id: country._id,
            name: country.name,
            image: this.getCountryImage(country.image),
        };
    }
}

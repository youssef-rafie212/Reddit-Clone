import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';
import { CountriesHelper } from 'src/modules/countries/helpers/countries.helper';

@Injectable()
@ValidatorConstraint({ async: true })
export class ValidCountry implements ValidatorConstraintInterface {
    constructor(private readonly countriesHelper: CountriesHelper) {}

    async validate(value: string): Promise<boolean> {
        if (!value || !mongoose.Types.ObjectId.isValid(value)) return false;

        return await this.countriesHelper.countryExists(value);
    }

    defaultMessage(): string {
        return 'messages.invalidCountry';
    }
}

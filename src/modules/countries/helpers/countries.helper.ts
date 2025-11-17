import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries.service';

@Injectable()
export class CountriesHelper {
    constructor(private readonly countriesService: CountriesService) {}

    async countryExists(id: string) {
        return (await this.countriesService.getOne(id)) !== null;
    }
}

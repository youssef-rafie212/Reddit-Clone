import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './entities/country.entity';
import { Model } from 'mongoose';

@Injectable()
export class CountriesService {
    constructor(
        @InjectModel(Country.name)
        private readonly countryModel: Model<Country>,
    ) {}

    async getOne(id: string) {
        return await this.countryModel.findById(id);
    }
}

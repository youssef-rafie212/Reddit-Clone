import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { countriesDbModule } from './db/countries.db.module';
import { CountriesHelper } from './helpers/countries.helper';

@Module({
    imports: [countriesDbModule],
    controllers: [CountriesController],
    providers: [CountriesService, CountriesHelper],
    exports: [CountriesService, countriesDbModule, CountriesHelper],
})
export class CountriesModule {}

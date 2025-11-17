import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.enitity';
import { Model } from 'mongoose';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    ) {}
}

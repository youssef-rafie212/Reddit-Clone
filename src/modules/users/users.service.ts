import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(data: CreateUserDto) {
        return await this.userModel.create(data);
    }

    async findOne(filter: { [key: string]: any }) {
        return await this.userModel.findOne(filter);
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }
}

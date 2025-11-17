import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './entities/device.entity';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
    constructor(
        @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
    ) {}

    async create(data: { fcmToken: string; deviceType: string; user: string }) {
        return await this.deviceModel.create(data);
    }

    async findOne(filter: { [key: string]: any }) {
        return await this.deviceModel.findOne(filter);
    }

    async deleteMany(filter: Partial<Device>) {
        await this.deviceModel.deleteMany(filter);
    }
}

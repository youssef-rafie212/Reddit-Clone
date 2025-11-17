import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Device {
    @Prop()
    fcmToken: string;

    @Prop({ type: String, enum: ['android', 'ios', 'web'] })
    deviceType: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, refPath: 'userRef' })
    user: string | User;

    @Prop({ type: String, enum: ['User'] })
    userRef: string;
}

export type DeviceDocument = Device & Document;

export const DeviceSchema = SchemaFactory.createForClass(Device);

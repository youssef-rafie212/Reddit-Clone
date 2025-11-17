import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class UserToken {
    @Prop()
    token: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, refPath: 'userRef' })
    user: string | User;

    @Prop({ type: String, enum: ['User'] })
    userRef: string;
}

export type UserTokenDocument = UserToken & Document;

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Block {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    blocker: string | User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    blocked: string | User;
}

export type BlockDocument = Block & Document;

export const BlockSchema = SchemaFactory.createForClass(Block);

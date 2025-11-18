import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Report {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    reporter: string | User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    reported: string | User;

    @Prop()
    reason: string;
}

export type ReportDocument = Report & Document;

export const ReportSchema = SchemaFactory.createForClass(Report);

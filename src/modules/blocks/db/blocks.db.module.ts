import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from '../entities/block.entity';

export const blocksDbModule = MongooseModule.forFeature([
    { name: Block.name, schema: BlockSchema },
]);

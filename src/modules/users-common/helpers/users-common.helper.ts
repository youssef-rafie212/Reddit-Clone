import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

type ServiceMap = {
    user: UsersService;
};

type ModelMap = {
    user: Model<User>;
};

export class UsersCommonHelper {
    private readonly serviceMap: ServiceMap;
    private readonly modelMap: ModelMap;

    constructor(
        private readonly usersService: UsersService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {
        this.serviceMap = {
            user: this.usersService,
        };

        this.modelMap = {
            user: this.userModel,
        };
    }

    getService<T extends keyof ServiceMap>(type: T): ServiceMap[T] {
        return this.serviceMap[type];
    }

    getModel<T extends keyof ModelMap>(type: T): ModelMap[T] {
        return this.modelMap[type];
    }

    getRef(type: string) {
        const refMap = {
            user: 'User',
            admin: 'Admin',
        };

        return refMap[type.toLowerCase()];
    }
}

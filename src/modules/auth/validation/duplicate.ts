import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { AuthHelper } from '../helpers/auth.helper';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AuthUtil } from 'src/common/utils/auth-util';

@Injectable()
@ValidatorConstraint({ async: true })
export class Duplicate implements ValidatorConstraintInterface {
    constructor(
        private readonly authHelper: AuthHelper,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async validate(value: string): Promise<boolean> {
        if (!value) return false;

        const type = AuthUtil.getIdentifierType(value);

        if (!type) return false;

        return !(await this.authHelper.duplicate(
            [this.userModel],
            type,
            value,
        ));
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const type = AuthUtil.getIdentifierType(validationArguments.value);

        return type === 'email'
            ? 'messages.emailExists'
            : type === 'phone'
              ? 'messages.phoneExists'
              : 'messages.identifierExists';
    }
}

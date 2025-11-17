import {
    IsMongoId,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { ValidCountry } from 'src/modules/auth/validation/valid-country';

export class CreateUserDto {
    @IsNotEmpty({ message: 'messages.nameRequired' })
    @IsString({ message: 'messages.invalidName' })
    @MinLength(3, { message: 'messages.invalidNameLength' })
    @MaxLength(20, { message: 'messages.invalidNameLength' })
    name: string;

    @IsNotEmpty({ message: 'messages.passwordRequired' })
    @IsString({ message: 'messages.invalidPassword' })
    @MinLength(6, { message: 'messages.invalidPasswordLength' })
    @MaxLength(20, { message: 'messages.invalidPasswordLength' })
    password: string;

    @IsNotEmpty({ message: 'messages.countryRequired' })
    @IsMongoId({ message: 'messages.invalidCountry' })
    @Validate(ValidCountry)
    country: string;

    avatar?: string;

    dataCompleted?: boolean;

    expireAt?: Date;

    otp?: string;

    otpExpireAt?: Date;
}

import * as path from 'path';
import { HeaderResolver } from 'nestjs-i18n';

export class I18nConfig {
    static readonly core = {
        fallbackLanguage: 'ar',
        loaderOptions: {
            path: path.join(__dirname, '..', 'locales'),
            watch: true,
        },
        resolvers: [new HeaderResolver(['lang'])],
    };
}

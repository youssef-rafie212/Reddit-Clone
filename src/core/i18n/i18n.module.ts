import { I18nModule } from 'nestjs-i18n';
import { I18nConfig } from 'src/config/i18n.config';

export const i18nModule = I18nModule.forRoot(I18nConfig.core);

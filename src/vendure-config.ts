import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from '@vendure/core'
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin'
import { AssetServerPlugin } from '@vendure/asset-server-plugin'
import { AdminUiPlugin } from '@vendure/admin-ui-plugin'
import 'dotenv/config'
import path from 'path'
import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler'
import { ReviewsPlugin } from './plugins/reviews'

const IS_DEV = process.env.APP_ENV === 'dev'

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { 'request.credentials': 'include' } as any,
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { 'request.credentials': 'include' } as any,
          },
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
  },
  dbConnectionOptions: {
    type: 'better-sqlite3',
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: false,
    migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
    logging: false,
    database: path.join(__dirname, '../vendure.sqlite'),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {
    Product: [
      {
        name: 'intensity',
        type: 'int',
        min: 0,
        max: 100,
        defaultValue: 0,
        ui: { component: 'slider-form-input' },
      },
    ],
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets',
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: 'http://localhost:8080/verify',
        passwordResetUrl: 'http://localhost:8080/password-reset',
        changeEmailAddressUrl:
          'http://localhost:8080/verify-email-address-change',
      },
    }),
    AdminUiPlugin.init({
      adminUiConfig: {
        brand: 'RealT',
        hideVendureBranding: false,
        hideVersion: false,
      },
      route: 'admin',
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '../admin-ui'),
        extensions: [
          setBranding({
            // The small logo appears in the top left of the screen
            smallLogoPath: path.join(
              __dirname,
              'ui-extensions/images/RealT_Logo.png'
            ),
            // The large logo is used on the login page
            largeLogoPath: path.join(
              __dirname,
              'ui-extensions/images/RealT_Logo.png'
            ),
          }),
          {
            // Points to the path containing our Angular "glue code" module
            extensionPath: path.join(__dirname, 'ui-extensions'),
            //to connect translations
            translations: {
              en: path.join(__dirname, 'ui-extensions/translations/en.json'),
            },
            ngModules: [
              {
                type: 'lazy',
                route: 'greet',
                ngModuleFileName: 'greeter.module.ts',
                ngModuleName: 'GreeterModule',
              },
              {
                type: 'lazy',
                route: 'product-reviews',
                ngModuleFileName: 'reviews-ui-lazy.module.ts',
                ngModuleName: 'ReviewsUiLazyModule',
              },
              {
                type: 'shared',
                ngModuleFileName: 'shared-extensions.module.ts',
                ngModuleName: 'SharedModuleExtensions',
              },
            ],
          },
        ],
        devMode: true,
      }),
    }),
    ReviewsPlugin,
  ],
}

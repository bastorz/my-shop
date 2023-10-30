import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
    InjectableStrategy,
    RequestContext,
    ProductVariant,
    Order,
    PriceCalculationResult,
    OrderItemPriceCalculationStrategy,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';


class MyOrderItemPriceCalculationStrategy implements OrderItemPriceCalculationStrategy {
    calculateUnitPrice(
        ctx: RequestContext,
        productVariant: ProductVariant,
        orderLineCustomFields: { [key: string]: any },
        order: Order,
        quantity: number,
    ): PriceCalculationResult | Promise<PriceCalculationResult> {
        // Your custom logic for calculating the unit price goes here
        // You can use the parameters passed to this method to calculate the price

        // For example:
        const totalPrice = Number(orderLineCustomFields.A4243x22mm * quantity);
        const priceCalculationResult: PriceCalculationResult = {
            price: totalPrice,
            priceIncludesTax: true
        };
        return priceCalculationResult;
    }
}

// Finally, register this custom strategy with Vendure in the appropriate module
// For example:
import { PluginCommonModule, VendurePlugin } from '@vendure/core';

@VendurePlugin({
    imports: [PluginCommonModule],
    configuration: config => {
        config.orderOptions.orderItemPriceCalculationStrategy = new MyOrderItemPriceCalculationStrategy();
        return config;
    },
})
export class MyCustomVendurePlugin {}


export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' },
            },
            adminApiDebug: true,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' },
            },
            shopApiDebug: true,
        } : {}),
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
            { name: 'Descripcion_Extra', type: 'string', ui: {component: 'rich-text-form-input'} },
            { name: 'Especificaciones_Del_Producto', type: 'string', ui: {component: 'rich-text-form-input'}  },
            { name: 'Normas_De_Diseno', type: 'string', ui: {component: 'rich-text-form-input'}  },
            { name: 'Proceso_De_Pedido', type: 'string', ui: {component: 'rich-text-form-input'}  },
        ],
        ProductOption: [
            {name: 'Price', type: 'float', ui: {component: 'currency-form-input'}}
        ],
        OrderLine : [
            {name: 'A4243x22mm', type: 'boolean', ui: {component: 'boolean-form-input'}}
        ]
        // ProductOptionGroup: [
        //     {
        //         options: [
        //             { value: '123' },
        //             // Add more options as needed
        //         ]
        //     }
        // ],
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
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 3002,
            adminUiConfig: {
                apiPort: 3000,
            },
        }),
    ],
};

import { Injectable } from '@nestjs/common';
import {
    InjectableStrategy,
    RequestContext,
    ProductVariant,
    Order,
    PriceCalculationResult,
} from '@vendure/core';


interface OrderItemPriceCalculationStrategy extends InjectableStrategy {
    calculateUnitPrice(
        ctx: RequestContext,
        productVariant: ProductVariant,
        orderLineCustomFields: { [key: string]: any },
        order: Order,
        quantity: number,
    ): PriceCalculationResult | Promise<PriceCalculationResult>;
}

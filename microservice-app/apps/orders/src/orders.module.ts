import {Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import * as Joi from 'joi'
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "@app/common/database/database.module";
import {OrdersRepository} from "./orders.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "./schemas/order.schema";
import {AuthModule, RmqModule} from "@app/common";
import {BILLING_SERVICES} from "./constants/services";

@Module({
    imports: [ConfigModule.forRoot(
        {
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required()
            }),
            envFilePath: './apps/orders/.env'
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        RmqModule.register({
            name: BILLING_SERVICES
        }),
        AuthModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {
}

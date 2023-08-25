import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICES } from './constants/services';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        @Inject(BILLING_SERVICES) private billingClient: ClientProxy,
    ) {}

    async createOrder(request: CreateOrderRequestDto, authentication: string) {
        const session = await this.ordersRepository.startTransaction();
        try {
            const order = await this.ordersRepository.create(request, { session });
            await lastValueFrom(
                this.billingClient.emit('order_created', {
                    request,
                    Authentication: authentication
                }),
            );
            await session.commitTransaction();
            return order;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        }
    }

    async getOrders() {
        return this.ordersRepository.find({});
    }
}
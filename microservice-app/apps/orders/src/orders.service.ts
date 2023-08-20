import {Injectable} from '@nestjs/common';
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {OrdersRepository} from "./orders.repository";
import {Order} from "./schemas/order.schema";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {
    }

    async createOrder(request: CreateOrderRequestDto): Promise<Order> {
        return this.ordersRepository.create(request);
    }

    async getOrders() {
        return this.ordersRepository.find({});
    }
}

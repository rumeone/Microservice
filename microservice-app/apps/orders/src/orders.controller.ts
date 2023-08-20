import {Controller, Post, Body, Get} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    async createOrder(@Body() request: CreateOrderRequestDto) {
        return this.ordersService.createOrder(request);
    }

    @Get()
    async getOrders() {
        return this.ordersService.getOrders();
    }
}

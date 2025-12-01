import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orderData: OrderDTO) {
    return this.orderService.create(orderData);
  }
}

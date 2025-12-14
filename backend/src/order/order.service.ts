import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { OrderDTO, TicketDTO } from '../repositories/order/dto/order.dto';
import { FilmsService } from '../films/films.service';
import { ApiListResponse } from '../repositories/films.repository.interface';

@Injectable()
export class OrderService {
  constructor(private readonly filmsService: FilmsService) {}

  async create(data: OrderDTO): Promise<ApiListResponse<TicketDTO>> {
    const items: TicketDTO[] = [];
    const tickets = data.tickets;

    for (const ticket of tickets) {
      const film = await this.filmsService.findById(ticket.film);
      if (!film) {
        throw new BadRequestException('Фильм не найден');
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      const seat = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seat)) {
        throw new ConflictException('Место уже занято');
      }

      const taken = [...session.taken, seat];

      const seatBooked = await this.filmsService.setTakenSeat(
        film.id,
        session.id,
        taken,
      );

      if (!seatBooked) {
        throw new Error('Место уже занято');
      }

      items.push({
        film: film.id,
        session: session.id,
        daytime: session.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    return { items, total: items.length };
  }
}

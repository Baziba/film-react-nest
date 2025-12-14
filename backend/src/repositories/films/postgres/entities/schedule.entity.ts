import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Film from './film.entity';

@Entity('schedules')
export default class Schedule {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array')
  taken: string[];

  @Column({ name: 'film_id' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'film_id' })
  film: Film;
}

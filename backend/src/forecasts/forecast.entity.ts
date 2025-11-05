import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('forecasts')
export class Forecast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'json' })
  forecastedValues: Array<{ date: string; value: number }>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  modelVersion: string;
}
import { TimestampEntity } from "src/generic/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("advert")
export class AdvertEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    nb_rooms: number;

    @Column({ nullable: true })
    surface: number;
}

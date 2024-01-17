import { AdvertEntity } from "src/advert/entities/advert.entity";
import { TimestampEntity } from "src/generic/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity  extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => AdvertEntity, advert => advert.user)
    adverts: AdvertEntity[];
}

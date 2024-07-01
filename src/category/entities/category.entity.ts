import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../generic/timestamp.entity";
import { AdvertEntity } from "../../advert/entities/advert.entity";
import { UserEntity } from "src/user/entities/user.entity";

@Entity("category")
export class CategoryEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => AdvertEntity, advert => advert.category)
    adverts: AdvertEntity[];

    @ManyToOne(() => UserEntity, user => user.categories)
    user: UserEntity;
}

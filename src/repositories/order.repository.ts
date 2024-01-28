/* eslint-disable prettier/prettier */
import { UserModel } from 'src/app.interface';
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { OrderProductDto } from 'src/dto/order/order-product.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@CustomRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  async makeOrder(data: OrderProductDto, { id: userId }: UserModel) {
    let order = this.create();
    const productIds: string[] = [];
    let updateValues = '';
    data.productLines.forEach((x) => {
      updateValues =
        `${updateValues?.trim() ? updateValues + ' ' : updateValues}` +
        `WHEN id = '${x.productId}' THEN stock - ${x.quantity}`;
      productIds.push(x.productId);
    });
    await this.manager.transaction(async (manager) => {
      order = await manager.save(OrderEntity, {
        userId,
        productLines: data.productLines,
      });

      await manager
        .createQueryBuilder()
        .update(ProductEntity)
        .set({
          stock: () => `CASE ${updateValues} ELSE stock END`,
        })
        .where('id IN (:...ids)', {
          ids: productIds,
        })
        .execute();
    });
    return order;
  }
}

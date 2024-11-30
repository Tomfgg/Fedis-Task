import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const productId = request.params.id;

        await this.productsService.validateOwnership(user._id.toString(), productId);

        return true;
    }
}

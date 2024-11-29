// src/common/guards/ownership.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assume the user is already authenticated
        const productId = request.params.id; // Example of retrieving `id` from route parameters

        // Delegate ownership check to the service
        await this.productsService.validateOwnership(user._id.toString(), productId);

        return true;
    }
}

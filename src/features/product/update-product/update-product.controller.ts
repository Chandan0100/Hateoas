import { Controller } from '@nestjs/common';
import { UpdateProductService } from './update-product-service';


@Controller('update-product')
export class UpdateProductController {
  constructor(private readonly updateproductService: UpdateProductService) {}
}

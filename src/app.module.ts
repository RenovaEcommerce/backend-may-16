import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Countertop, CountertopSchema } from './schemas/countertops.schema';
import { Cabinet, CabinetSchema } from './schemas/cabinet.schema';
import { TopProduct, TopProductSchema } from './schemas/topProducts.schema';
import { Tile, TileSchema } from './schemas/tile.schema';
import { Carpet, CarpetSchema } from './schemas/carpet.schema';
import { Services, ServicesSchema } from './schemas/services.schema';
import { Form, FormSchema } from './schemas/form.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Blog, BlogSchema } from './schemas/blog.schema';

// Services & Controllers
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { FormService } from './form/form.service';
import { FormController } from './form/form.controller';
import { LocationService } from './services/location.service';
import { LocationController } from './services/location.controller';
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';
import { ServiceSub, ServiceSubSchema } from './schemas/service.schema';
import { ServiceSubService } from './service/servicesub.service';
import { ServiceSubController } from './service/servicesub.controller';

@Module({
  imports: [
    // MongoDB connections
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/products?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'productsDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/services?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'servicesDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/serviceSub?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'serviceSubDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/form?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'requestFormDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/location?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'locationDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/blog?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'blogDb' },
    ),

    // Feature modules
    MongooseModule.forFeature(
      [
        { name: Countertop.name, schema: CountertopSchema },
        { name: Cabinet.name, schema: CabinetSchema },
        { name: TopProduct.name, schema: TopProductSchema },
        { name: Tile.name, schema: TileSchema },
        { name: Carpet.name, schema: CarpetSchema },
      ],
      'productsDb',
    ),

    MongooseModule.forFeature(
      [{ name: ServiceSub.name, schema: ServiceSubSchema }],
      'serviceSubDb',
    ),
    MongooseModule.forFeature(
      [{ name: Services.name, schema: ServicesSchema }],
      'servicesDb',
    ),
    MongooseModule.forFeature(
      [{ name: Form.name, schema: FormSchema }],
      'requestFormDb',
    ),
    MongooseModule.forFeature(
      [{ name: Location.name, schema: LocationSchema }],
      'locationDb',
    ),
    MongooseModule.forFeature(
      [{ name: Blog.name, schema: BlogSchema }],
      'blogDb',
    ),
  ],
  providers: [
    ProductsService,
    ServicesService,
    FormService,
    LocationService,
    BlogService,
    ServiceSubService,
  ],
  controllers: [
    ProductsController,
    ServicesController,
    FormController,
    LocationController,
    BlogController,
    ServiceSubController,
  ],
})
export class AppModule {}

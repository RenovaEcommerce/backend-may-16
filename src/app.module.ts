import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Countertops, CountertopsSchema } from './schemas/countertops.schema';
import { Vanities, VanitiesSchema } from './schemas/vanities.schema';
import { TopProduct, TopProductSchema } from './schemas/topProducts.schema';
import { Tiles, TilesSchema } from './schemas/tiles.schema';
import { Carpets, CarpetsSchema } from './schemas/carpet.schema';
import { Services, ServicesSchema } from './schemas/services.schema';
import { Form, FormSchema } from './schemas/form.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { Faucets, FaucetsSchema } from './schemas/faucets.schema';
import { Laminates, LaminatesSchema } from './schemas/laminates.schema';
import { Doors, DoorsSchema } from './schemas/doors.schema';
import { ServiceSub, ServiceSubSchema } from './schemas/service.schema';
import { Hardwoods, HardwoodsSchema } from './schemas/hardwoods.schema';
import { Vinyls, VinylsSchema } from './schemas/vinyls.schema';
import { ProductsLinks, ProductsLinksSchema } from './schemas/product-links.schema';
import { Sinks, SinksSchema } from './schemas/sinks.schema';

import { MovingFormService } from './services/moving-form.service';
import { MovingFormController } from './controller/moving-form.controller';

// Services & Controllers
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { FormService } from './form/form.service';
import { FormController } from './form/form.controller';
import { LocationService } from './services/location.service';
import { LocationController } from './services/location.controller';
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';
import { ServiceSubService } from './service/servicesub.service';
import { ServiceSubController } from './service/servicesub.controller';
import { MovingForm, MovingFormSchema } from './schemas/moving-form.schema';
import { ServicesNew, ServicesNewSchema } from './schemas/servicesNew.schema';
import { ServicesNewService } from './servicesNew/servicesNew.service';
import { ServicesNewController } from './servicesNew/servicesNew.controller';

@Module({
  imports: [
    // MongoDB connections
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/productsLinks?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'productsLinksDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/products?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'productsDb' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/services?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'servicesDb' },

    ),
    MongooseModule.forFeature(
      [{ name: ServicesNew.name, schema: ServicesNewSchema }],
      'servicesNewDb',
    ),
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/servicesNew?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'servicesNewDb' },
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
    MongooseModule.forRoot(
      'mongodb+srv://mikhailyev:Moscow2024@renovacluster.mprylq8.mongodb.net/movingForm?retryWrites=true&w=majority&appName=RenovaCluster',
      { connectionName: 'movingFormDb' },
    ),

    // Feature modules
    MongooseModule.forFeature(
      [
        { name: Countertops.name, schema: CountertopsSchema },
        { name: Vanities.name, schema: VanitiesSchema },
        { name: TopProduct.name, schema: TopProductSchema },
        { name: Tiles.name, schema: TilesSchema },
        { name: Carpets.name, schema: CarpetsSchema },
        { name: Hardwoods.name, schema: HardwoodsSchema },
        { name: Vinyls.name, schema: VinylsSchema },
        { name: Faucets.name, schema: FaucetsSchema },
        { name: Laminates.name, schema: LaminatesSchema },
        { name: Doors.name, schema: DoorsSchema },
        { name: Sinks.name, schema: SinksSchema },
      ],
      'productsDb',
    ),

    MongooseModule.forFeature(
      [
        { name: ProductsLinks.name, schema: ProductsLinksSchema },
      ],
      'productsLinksDb',
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
    MongooseModule.forFeature(
      [{ name: MovingForm.name, schema: MovingFormSchema }],
      'movingFormDb',
    ),
  ],
  providers: [
    ServicesController,
    ServicesNewService,
    ServicesService,
    ServicesNewService,

    ServicesService,
    FormService,
    LocationService,
    BlogService,
    ServiceSubService,
    MovingFormService,
  ],
  controllers: [
    ServicesNewController,
    ServicesController,
    FormController,
    LocationController,
    BlogController,
    ServiceSubController,
 
    MovingFormController,
  ],
})
export class AppModule {}

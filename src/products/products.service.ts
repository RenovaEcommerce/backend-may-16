import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vanities } from 'src/schemas/vanities.schema';
import { Countertops } from 'src/schemas/countertops.schema';
import { Tiles } from 'src/schemas/tiles.schema';
// import { AllProductsType } from './products.interface';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { TopProduct } from 'src/schemas/topProducts.schema';
import { Carpets } from 'src/schemas/carpet.schema';
import { Hardwoods } from 'src/schemas/hardwoods.schema';
import { Vinyls } from 'src/schemas/vinyls.schema';
import { CreateCarpetDto } from 'src/dto/create-carpet.dto';
import axios from 'axios';
import { CreateHardwoodDto } from 'src/dto/create-hardwood.dto';
import { CreateVinylDto } from 'src/dto/create-vinyl.dto';
import { CreateTileDto } from 'src/dto/create-tile-.dto';
import { CreateTilesDto } from 'src/dto/create-multi-tiles.dto';
import { Product } from 'src/schemas/products.schema';
import { CreateProductsDto } from 'src/dto/products.dto';
import { Laminates } from 'src/schemas/laminates.schema';
import { Doors } from 'src/schemas/doors.schema';
import { Sinks } from 'src/schemas/sinks.schema';
import { Faucets } from 'src/schemas/faucets.schema';

@Injectable()
export class ProductsService {
  private modelMap: { [key: string]: Model<any> };

  // selectedCategoryData;
  constructor(
    @InjectModel(Carpets.name, 'productsDb') private carpetsModel: Model<any>,
    @InjectModel(Hardwoods.name, 'productsDb') private hardwoodsModel: Model<any>,
    @InjectModel(Vinyls.name, 'productsDb') private vinylsModel: Model<any>,
    @InjectModel(Laminates.name, 'productsDb') private laminatesModel: Model<any>,
    @InjectModel(Tiles.name, 'productsDb') private tilesModel: Model<any>,
    @InjectModel(Countertops.name, 'productsDb') private countertopsModel: Model<any>,
    @InjectModel(Doors.name, 'productsDb') private doorsModel: Model<any>,
    @InjectModel(Sinks.name, 'productsDb') private sinksModel: Model<any>,
    @InjectModel(Faucets.name, 'productsDb') private faucetsModel: Model<any>,
    @InjectModel(Vanities.name, 'productsDb') private vanitiesModel: Model<any>,
    @InjectModel(TopProduct.name, 'productsDb') private topProductModel: Model<any>,
    @InjectModel(Product.name, 'productsDb') private productlModel: Model<Product>,

  ) {
    this.modelMap = {
      carpets: this.carpetsModel,
      hardwoods: this.hardwoodsModel,
      vinyls: this.vinylsModel,
      laminates: this.laminatesModel,
      tiles: this.tilesModel,
      countertops: this.countertopsModel,
      doors: this.doorsModel,
      sinks: this.sinksModel,
      faucets: this.faucetsModel,
      vanities: this.vanitiesModel,
    };
  }

  private getModel(modelName: string): Model<any> {
    switch (modelName.toLowerCase()) {
      case 'carpets':
        return this.carpetsModel;
      case 'hardwoods':
        return this.hardwoodsModel;
      case 'vinyls':
        return this.vinylsModel;
      case 'laminates':
        return this.laminatesModel;
      case 'tiles':
        return this.tilesModel;
      case 'countertops':
        return this.countertopsModel;
      case 'doors':
        return this.doorsModel;
      case 'sinks':
        return this.sinksModel;
      case 'faucets':
        return this.faucetsModel;
      case 'vanities':
        return this.vanitiesModel;
      default:
        throw new Error(`Unknown model name: ${modelName}`);
    }
  }
  async findAll(query?: ExpressQuery): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 8;
    const skip = (page - 1) * limit;

    const tile = await this.tilesModel.find().skip(skip).limit(limit).exec();
    const countertop = await this.countertopsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const cabinet = await this.vanitiesModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const carpet = await this.carpetsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Объединяем результаты в один массив
    const combinedProducts = [...cabinet, ...countertop, ...tile, ...carpet].sort(() => Math.random() - 0.5)
    const totalCounts = await Promise.all([
      this.tilesModel.countDocuments().exec(),
      this.countertopsModel.countDocuments().exec(),
      this.vanitiesModel.countDocuments().exec(),
      this.carpetsModel.countDocuments().exec()
    ]);

    // Sum up all counts
    const totalCount = totalCounts.reduce((acc, count) => acc + count, 0);

    return { data: combinedProducts, totalCount };
  }


  async findCanadianProducts(): Promise<Tiles[]> {
    return await this.tilesModel.find({ canada: true }).exec();
  }

  async findAllProductsByCategory(
    category: string,
    query: ExpressQuery,
  ): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 32;
    const skip = (page - 1) * limit;

    let model;
    switch (category.toLowerCase()) {
      case 'tiles':
        model = this.tilesModel;
        break;
      case 'countertops':
        model = this.countertopsModel;
        break;
      case 'vanities':
        model = this.vanitiesModel;
        break;
      case 'carpets':
        model = this.carpetsModel;
        break;
      default:
        // В случае если категория не соответствует, возможно стоит выбросить ошибку или вернуть пустой результат
        return { data: [], totalCount: 0 };
    }

    // Получаем данные с учетом пагинации
    const data = await model
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Получаем общее количество записей в категории
    const totalCount = await model.countDocuments().exec();

    return { data, totalCount };
  }


  async findAllProductsByCategoryAndFeature(
    category: string,
    subcategoryKey: string,
    selectedValue: string,
    query: ExpressQuery,
  ): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 2;
    const skip = (page - 1) * limit;

    // Создаём объект запроса с регулярным выражением и опциями
    const regexQuery = { $regex: new RegExp(selectedValue, 'i') };

    let model;
    switch (category.toLowerCase()) {
      case 'tiles':
        model = this.tilesModel;
        break;
      case 'countertops':
        model = this.countertopsModel;
        break;
      case 'vanities':
        model = this.vanitiesModel;
        break;
      case 'carpets':
        model = this.carpetsModel;
        break;
      default:
        return { data: [], totalCount: 0 };
    }

    // Выполняем запрос с учётом пагинации
    const data = await model
      .find({ [subcategoryKey]: regexQuery })
      .skip(skip)
      .limit(limit)
      .exec();

    // Получаем общее количество документов, соответствующих запросу
    const totalCount = await model.countDocuments({ [subcategoryKey]: regexQuery }).exec();

    return { data, totalCount };
  }

  async searchByKeywordInCategory(
    category: string,
    query: any,
  ): Promise<{ data: any[], totalCount: number }> {
    const model = this.modelMap[category];
    if (!model) {
      throw new Error(`Unknown category: ${category}`);
    }
    const searchCriteria = Object.keys(query).reduce((criteria, key) => {
      const queryValue = query[key].split(',');
      criteria[key] = { $regex: new RegExp(queryValue.join('|'), 'i') };
      return criteria;
    }, {});



    try {
      const results = await model.find(searchCriteria).exec();
      const totalCount = await model.countDocuments(searchCriteria).exec();
      return { data: results, totalCount }
    } catch (error) {
      console.error(`Error searching in category ${category}:`, error);
      throw new Error('Error searching for products');
    }
  }

  async createCarpet(createCarpetDto: CreateCarpetDto): Promise<Carpets> {
    const createdCarpet = new this.carpetsModel(createCarpetDto);
    return await createdCarpet.save();
  }

  async createHardwood(createHardwoodDto: CreateHardwoodDto): Promise<Hardwoods> {
    const createdHardwood = new this.hardwoodsModel(createHardwoodDto);
    return await createdHardwood.save();
  }

  async createVinyl(createVinylDto: CreateVinylDto): Promise<Vinyls> {
    const createdvinyl = new this.vinylsModel(createVinylDto);
    return await createdvinyl.save();
  }


 async createProducts(modelName: string, createProductsDto: any): Promise<any[]> {
    const model = this.getModel(modelName);
    if (createProductsDto?.length > 1) {
      return await model.insertMany(createProductsDto);
    } else {
      const createdProduct = new model(createProductsDto[0]);
      await createdProduct.save();
      return [createdProduct];
    }
  }

  async getCarpet() {
    try {
      // Call external API and wait for the response
      const response = await axios.post('http://localhost:8000/products/create-carpet');

      if (response.status !== 200) {
        throw new Error('Failed to create carpet via external API');
      }

      // Assuming the external API returns the created carpet details
      const createdCarpetData = response.data;

      // Optionally, you can use the response data to create a local record
      const createdCarpet = new this.carpetsModel(createdCarpetData);
      return await createdCarpet.save();
    } catch (error) {
      // Handle errors appropriately
      console.error('Error creating carpet:', error.message);
      throw new InternalServerErrorException('Failed to create carpet');
    }
  }

  async findAllUids(category: string) {
    const model = this.getModel(category);
    const uids = await model.find({}, { uid: 1, _id: 0 }); // Project only the uid field
    return uids.map(doc => doc.uid); // Extract uid values from the documents and return as a flat array
  }

  async findTopProducts(category: string) {
    const topProducts = await this.topProductModel.find({ 'type': category }).exec()
    return topProducts;
  }
}

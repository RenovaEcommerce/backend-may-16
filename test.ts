import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vanities } from 'src/schemas/vanities.schema';
import { Countertops } from 'src/schemas/countertops.schema';
import { Tiles } from 'src/schemas/tiles.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { TopProduct } from 'src/schemas/topProducts.schema';
import { Carpets } from 'src/schemas/carpet.schema';
import { Hardwoods } from 'src/schemas/hardwoods.schema';
import { Vinyls } from 'src/schemas/vinyls.schema';


@Injectable()
export class ProductsService {
  private modelMap: { [key: string]: Model<any> };

  selectedCategoryData;
  constructor(
    @InjectModel(Tiles.name, 'productsDb') private tileModel: Model<Tiles>,
    @InjectModel(Countertops.name, 'productsDb') private countertopModel: Model<Countertops>,
    @InjectModel(Vanities.name, 'productsDb') private cabinetModel: Model<Vanities>,
    @InjectModel(TopProduct.name, 'productsDb') private topProductModel: Model<TopProduct>,
    @InjectModel(Carpets.name, 'productsDb') private carpetModel: Model<Carpets>,
    @InjectModel(Hardwoods.name, 'productsDb') private hardwoodModel: Model<Hardwoods>,
    @InjectModel(Vinyls.name, 'productsDb') private vinylModel: Model<Vinyls>,
  ) {
    this.modelMap = {
      countertops: this.countertopModel,
      tile: this.tileModel,
      cabinets: this.cabinetModel,
      carpets: this.carpetModel
    };
  }

  async findAll(query?: ExpressQuery): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 8;
    const skip = (page - 1) * limit;

    const tile = await this.tileModel.find().skip(skip).limit(limit).exec();
    const countertop = await this.countertopModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const cabinet = await this.cabinetModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const carpet = await this.carpetModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Объединяем результаты в один массив
    const combinedProducts = [...cabinet, ...countertop, ...tile, ...carpet].sort(() => Math.random() - 0.5)
    const totalCounts = await Promise.all([
      this.tileModel.countDocuments().exec(),
      this.countertopModel.countDocuments().exec(),
      this.cabinetModel.countDocuments().exec(),
      this.carpetModel.countDocuments().exec()
    ]);

    // Sum up all counts
    const totalCount = totalCounts.reduce((acc, count) => acc + count, 0);

    return { data: combinedProducts, totalCount };
  }


  async findCanadianProducts(): Promise<Tiles[]> {
    return await this.tileModel.find({ canada: true }).exec();
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
      case 'tile':
        model = this.tileModel;
        break;
      case 'countertops':
        model = this.countertopModel;
        break;
      case 'cabinets':
        model = this.cabinetModel;
        break;
      case 'carpets':
        model = this.carpetModel;
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
      case 'tile':
        model = this.tileModel;
        break;
      case 'countertops':
        model = this.countertopModel;
        break;
      case 'cabinets':
        model = this.cabinetModel;
        break;
      case 'carpets':
        model = this.carpetModel;
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
  


  async findTopProducts(category: string) {
    const topProducts = await this.topProductModel.find({ 'type': category }).exec()
    return topProducts;
  }
}

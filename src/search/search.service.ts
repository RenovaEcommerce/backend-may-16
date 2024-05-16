import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog.schema';

@Injectable()
export class YourMongoDBService {
  constructor(@InjectModel('YourModel') private readonly yourModel: Model<Blog>) {}

  async search(query: string): Promise<any[]> {
    const results = await this.yourModel.find({ $text: { $search: query } });
    return results;
  }
}

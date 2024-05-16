import { Controller, Get, Query } from '@nestjs/common';
import { YourMongoDBService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly mongoService: YourMongoDBService) {}

  @Get()
  async search(@Query('query') query: string) {
    try {
      const results = await this.mongoService.search(query);
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.blogService.findAll();
  }
  @Get('search/:query')
  async search(@Param('query') query: string): Promise<any> {
    return this.blogService.search(query);
  }
  
  @Get('category/:category')
  async getCategory(@Param('category') category: string): Promise<any> {
    return this.blogService.findBlogCategory(category);
  }

  @Get('url/:url')
  async getOne(@Param('url') url: string): Promise<any> {
    return this.blogService.findBlogPage(url);
  }
}

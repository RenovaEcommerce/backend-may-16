import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name, 'blogDb') private blogModel: Model<Blog>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.blogModel.find().exec();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error; // or handle accordingly
    }
  }

  async findBlogCategory(category: string): Promise<any> {
    return await this.blogModel.find({ 'category': category }).exec();
  }

  async findBlogPage(url: string): Promise<any> {
    try {
      return await this.blogModel.findOne({ 'url': url }).exec();
    } catch (error) {
      console.error('Error fetching blog page:', error);
      throw error; // or handle accordingly
    }
  }

  async search(query: string): Promise<any> {
    try {
      return await this.blogModel
        .find({
          $or: [
            { url: { $regex: query, $options: 'i' } }, // Поиск по url
            { metaTitle: { $regex: query, $options: 'i' } }, // Поиск по metaTitle
            { metaDescription: { $regex: query, $options: 'i' } }, // Поиск по metaDescription
            { markdown: { $regex: query, $options: 'i' } }, // Поиск по markdown
          ],
        })
        .exec();
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error; // or handle accordingly
    }
  }
}
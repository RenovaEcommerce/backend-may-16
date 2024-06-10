import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface WarrantySection {
  image: string;
  imageAlt: string;
  phrase: string;
  h2: string;
  paragraph1: string;
  paragraph2: string;
  price: string;
}

@Schema()
export class Services extends Document {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: Object,
  })
  hero: {
    h1: string;
    heroPhrase: string;
    heroP: string;
    heroImageAlt: string;
  };

  @Prop({
    required: true,
    type: Object,
  })
  about: {
    phrase1: string;
    phrase2: string;
    priceLine1: string;
    priceLine2: string;
    image1: string;
    image1alt: string;
    image2: string;
    image2alt: string;
    sectionH1: string;
    sectionP1: string;
    sectionP2: string;
    section2H2: string;
    section2P1: string;
    section2P2: string;
    perks: Array<{
      heading: string;
      paragraph: string;
    }>;
  };

  @Prop({
    required: true,
    type: Array,
  })
  ourServices: Array<{
    h2: string;
    paragraph: string;
    array: Array<{
      heading: string;
      paragraph: string;
      url: string;
      image: string;
      price: string;
    }>;
    servicesMarkdown: string;
  }>;

  @Prop({
    required: true,
    type: Object,
  })
  manufacturers: {
    h2: string;
    p: string;
    markdownmanufacturers: string;
  };

  @Prop({
    required: true,
    type: Array,
  })
  howWeWork: Array<{
    id: number;
    title: string;
    description: {
      p1: string;
      p2: string;
      p3: string;
    };
    imagePath: string;
  }>;

  @Prop({
    required: true,
    type: Array,
  })
  faqItems: Array<{
    question: string;
    answer: string;
  }>;

  @Prop({ required: true, type: Map })
  warrantySection: WarrantySection;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);

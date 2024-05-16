import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ServiceSub extends Document {
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
    type: {
      h1: String,
      heroH2: String,
      heroP: String,
      heroImageAlt: String
    },
  })
  hero: {
    h1: string;
    heroH2: string;
    heroP: string;
    heroImageAlt: string;
  };

  @Prop({
    required: true,
    type: {
      image1: String,
      image1alt: String,
      image2: String,
      image2alt: String,
      sectionH2: String,
      sectionP1: String,
      sectionP2: String,
      section2H2: String,
      section2P1: String,
      section2P2: String,
      perks: [
        {
          heading: String,
          paragraph: String,
        },
      ],
    },
  })
  about: {
    image1: string;
    image1alt: string;
    image2: string;
    image2alt: string;
    sectionH2: string;
    sectionP1: string;
    sectionP2: string;
    section2H2: string;
    section2P1: string;
    section2P2: string;
    perks: { heading: string; paragraph: string }[];
  };

  @Prop({
    required: true,
    type: [
      {
        id: Number,
        title: String,
        description: {
          p1: String,
          p2: String,
          p3: String
        },
        imagePath: String
      },
    ],
  })
  howWeWork: {
    id: number;
    title: string;
    description: {
      p1: string;
      p2: string;
      p3: string;
    };
    imagePath: string;
  }[];

  @Prop({
    required: true,
    type: [
      {
        heading: String,
        paragraph: String,
        url: String,
        image: String,
        price: String,
      },
    ],
  })
  servicesSlider: {
    heading: string;
    paragraph: string;
    url: string;
    image: string;
    price: string;
  }[];

  @Prop({
    required: true,
    type: [
      {
        question: String,
        answer: String,
      },
    ],
  })
  faqItems: {
    question: string;
    answer: string;
  }[];

  @Prop({ required: true })
  markdown: string;
}


export const ServiceSubSchema = SchemaFactory.createForClass(ServiceSub);

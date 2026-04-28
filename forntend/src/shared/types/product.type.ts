export type RelatedVariantType = {
  _id: string;
  color: string;
  colorCode: string;
  thumbnail: string;
};

export type ProductType = {
  _id: string;
  groupId: string;
  name: string;
  brand: string;
  description: string;
  gender: string;
  isBestSeller: boolean;
  isNewArrival: boolean;
  basePrice: number;
  color: string;
  colorCode: string;
  images: string[];
  sizes: number[];
  relatedVariants: RelatedVariantType[];
};
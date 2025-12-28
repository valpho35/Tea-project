export interface TeaProduct {
    id: number;
    title: string;
    price: number;
    weight: number;
    description: string;
    detailedDescription?: string;
    ingredients: string;
    category: string;
    image: string;
    inStock: boolean;
    brewingTips?: string;
}

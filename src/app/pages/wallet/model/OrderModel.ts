export class OrderModel {
    itemName: string;
    itemAmount: number;
    itemTotal: number;
    couponCode: string;
    couponDiscount: number;
    orderTotal: number;

    hash: string;
}
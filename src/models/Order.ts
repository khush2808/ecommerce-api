import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  orderDate: Date;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);


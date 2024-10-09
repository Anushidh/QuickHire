import mongoose from 'mongoose';
import { IClient, IClientModel } from '../interfaces/IClient';

const clientSchema = new mongoose.Schema<IClient>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip_code: { type: String, default: null },
    country: { type: String, default: null },
  },
  profile_picture: { type: String, default: null },
  bio: { type: String, default: null },
  date_of_birth: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  projects_posted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  completed_projects: { type: Number, default: 0 },
  total_spent: { type: Number, default: 0 },
  freelancer_rating: { type: Number, min: 0, max: 5, default: 0 },
  total_reviews: { type: Number, default: 0 },
  total_rating: { type: Number, default: 0 },
  disputes: { type: Number, default: 0 },
  favorite_freelancers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' }],
}, {
  timestamps: true,
});

clientSchema.methods.updateFreelancerRating = function(this: IClient, newRating: number): Promise<IClient> {
  this.total_reviews += 1;
  this.total_rating += newRating;
  this.freelancer_rating = this.total_rating / this.total_reviews;
  return this.save();
};

const Client: IClientModel = mongoose.model<IClient, IClientModel>('Client', clientSchema);

export default Client;
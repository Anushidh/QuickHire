import mongoose, { Document } from 'mongoose';
import { IAddress } from './IAddress';

export interface IClient extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  address: IAddress;
  profile_picture: string | null;
  bio: string | null;
  date_of_birth: Date | null;
  isVerified: boolean;
  isBlocked: boolean;
  projects_posted: mongoose.Types.ObjectId[];
  completed_projects: number;
  total_spent: number;
  freelancer_rating: number;
  total_reviews: number;
  total_rating: number;
  disputes: number;
  favorite_freelancers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  updateFreelancerRating(newRating: number): Promise<IClient>;
}

export interface IClientModel extends mongoose.Model<IClient> {
  // You can add static methods here if needed
}
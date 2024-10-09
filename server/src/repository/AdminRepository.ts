import Admin from "../models/Admin";
import { IAdmin } from "../interfaces/IAdmin";
import { comparePasswords } from "../utils/password";


export class AdminRepository {
  async getAdmin(email: string, password: string): Promise<IAdmin> {
    const admin = await Admin.findOne({email}).lean() 
    if (!admin) {
      throw new Error('Admin not found');
    }
    const isMatch = await comparePasswords(password, admin.password)
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    return admin as IAdmin;
  }
}
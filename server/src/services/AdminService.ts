import { AdminRepository } from "../repository/AdminRepository";
import { IAdmin } from "../interfaces/IAdmin";


export class AdminService {
  private static instance: AdminService;
  private adminRepository: AdminRepository;

  private constructor() {
    this.adminRepository = new AdminRepository();
  }

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  async getAdmin(email: string, password: string): Promise<IAdmin> {
    try {
      return await this.adminRepository.getAdmin(email, password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Admin not found' || error.message === 'Incorrect password') {
          throw error;
        }
        throw new Error("Failed to get Admin");
      } else {
        throw new Error("An unknown error occurred while fetching the admin.");
      }
    }
  }

}

// @types/express/index.d.ts
import { AdminService } from "../../services/AdminService";

declare global {
  namespace Express {
    interface Request {
      adminService: AdminService;
    }
  }
}

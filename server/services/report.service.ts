import { Report } from '@prisma/client';
import reportModel from '../models/report.model';

class ReportServices {
  public async view(id: string): Promise<Report | null> {
    return reportModel.view(id);
  }
}

export default new ReportServices();

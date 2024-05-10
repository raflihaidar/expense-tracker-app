import { prisma } from '../common/db';
import { Report, User } from '@prisma/client';

class ReportModel {
  public async view(id: string): Promise<Report | null> {
    return prisma.report.findUnique({
      where: {
        id
      }
    });
  }
}

export default new ReportModel();

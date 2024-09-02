import { Injectable } from '@nestjs/common';
import { AccessCode } from 'src/domain/scholarship-applications/access-code';
import { ScholarshipApplication } from 'src/domain/scholarship-applications/scholarship-applications.entity';
import { ScholarshipRequestInterface } from 'src/features/scholarship-applications/scholarship-applications-requests/scholarship-applications-requests.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ScholarshipApplicationRequestRepository extends Repository<ScholarshipApplication> {
  constructor(private dataSource: DataSource) {
    super(ScholarshipApplication, dataSource.createEntityManager());
  }

  public async createScholarshipApplication( payload: ScholarshipRequestInterface, transaction = null) {
    if (transaction) {
      return await transaction.save(ScholarshipApplication, payload);
    }
    return await this.save(payload);
  }

  public async findByToken(token: AccessCode): Promise<ScholarshipApplication> {
    return await this.findOne({ where: { token } });
  }

  public async getScholarShipApplication(uuid: string): Promise<ScholarshipApplication> {
    return await this.findOne({where: {uuid} })
  }
}

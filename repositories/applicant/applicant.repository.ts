import { Injectable } from '@nestjs/common';
import { Applicant } from 'src/domain/applicants/applicant.entity';
import { ApplicantPayloadInterface } from 'src/features/applicant/applicant.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApplicantRepository extends Repository<Applicant> {
  constructor(private dataSource: DataSource) {
    super(Applicant, dataSource.createEntityManager());
  }

  public async createApplicant(
    payload: ApplicantPayloadInterface,
    transaction = null,
  ): Promise<ApplicantPayloadInterface> {
    if (transaction) {
      return await transaction.save(Applicant, payload);
    }
    return await this.save(payload);
  }
  async getApplicantByEmailOrUUID(email: string, uuid: string): Promise<Applicant | undefined> {
    return await this.createQueryBuilder('applicant')
      .where('applicant.email = :email OR applicant.uuid = :uuid', { email, uuid })
      .getOne();
  }
  async getApplicantByUUID(uuid: string): Promise<Applicant> {
    return await this.findOne({ where: { uuid } });
  }
}

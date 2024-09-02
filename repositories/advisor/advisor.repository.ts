import { Injectable } from "@nestjs/common";
import { Advisor } from "src/domain/advisor/advisors.entity";
import { AdvisorInterface, AdvisorResponseInterface } from "src/features/advisor/advisor.interface";
import { DataSource,  Repository } from "typeorm";

@Injectable()
export class AdvisorRepository extends Repository<Advisor> {
    constructor(private dataSource: DataSource) {
        super(Advisor, dataSource.createEntityManager());
    }

    public async createAdvisor (payload: AdvisorInterface,transaction=null):Promise<Advisor> {
      if(transaction) {
        return  await transaction.save(Advisor,payload)
      }
      return await this.save(payload) 
    }

    async getAdvisorByEmail(email: string): Promise<AdvisorResponseInterface> {
      return await this.findOne({ where: { email } });
    }

    async getAdvisorByUUID(uuid: string): Promise<AdvisorResponseInterface> {
      return await this.findOne({ where: { uuid } });
    }
   
}
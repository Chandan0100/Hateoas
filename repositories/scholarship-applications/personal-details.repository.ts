import { Injectable } from "@nestjs/common";
import { response } from "express";
import { PersonalDetails } from "src/domain/scholarship-applications/personal-details.entity";
import { AddPersonalDetails } from "src/features/scholarship-applications/personal-details-management/personal-details-management.interface";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PersonalDetailsManagementRepository extends Repository<PersonalDetails> {
    constructor(private dataSource: DataSource) { 
        super(PersonalDetails, dataSource.createEntityManager());
    }

    public async addPersonalDetails(payload: AddPersonalDetails) : Promise<PersonalDetails> {
        return await this.save(payload)
    }

    public async updatePersonalDetails(id : number, payload: any) : Promise<PersonalDetails> {
        await this.update({id}, payload);
        const personalDetails = await this.getPersonalDetails(id);
        return personalDetails;
    }

    public async getPersonalDetails(id: number) : Promise<PersonalDetails>{
        const response =  await this.findOne({where : {id}})
        return response;
    }
    
    public async getPersonalDetailsByScholarshipId(id: any): Promise<PersonalDetails> {
        return await this.createQueryBuilder().where('scholarship_application_id =:id',{id}).getOne()
    }
}
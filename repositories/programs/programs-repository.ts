import { Injectable } from "@nestjs/common";
import { Program } from "src/domain/program/programs.entity";

import { DataSource,  Repository } from "typeorm";

@Injectable()
export class ProgramsRepository extends Repository<Program> {
    constructor(private dataSource: DataSource) {
        super(Program, dataSource.createEntityManager());
    }

    async getProgramByUUID(uuid:string) {
        return await this.findOne({where : {uuid}})
    }
   
}
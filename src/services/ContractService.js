"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const redis_1 = require("../config/redis");
const database_1 = require("../config/database");
const Contract_1 = require("../entities/Contract");
class ContractService {
    async createContract(title, userId, description, value) {
        const contractRepo = database_1.AppDataSource.getRepository(Contract_1.Contract);
        const contract = contractRepo.create({
            title,
            userId,
            description,
            value,
            status: "active",
        });
        await contractRepo.save(contract);
        const redisKey = `contract:last:${userId}`;
        await redis_1.redis.set(redisKey, JSON.stringify(contract), "EX", 3600);
        return contract;
    }
}
exports.ContractService = ContractService;
//# sourceMappingURL=ContractService.js.map
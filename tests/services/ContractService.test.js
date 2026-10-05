"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContractService_1 = require("../../src/services/ContractService");
const redis_1 = require("../../src/config/redis");
const database_1 = require("../../src/config/database");
jest.mock("../../src/config/redis", () => ({
    redis: {
        set: jest.fn(),
    },
}));
jest.mock("../../src/config/database", () => {
    return {
        AppDataSource: {
            getRepository: jest.fn(),
        },
    };
});
describe("ContractService", () => {
    let contractService;
    let mockContractRepository;
    beforeEach(() => {
        contractService = new ContractService_1.ContractService();
        mockContractRepository = {
            create: jest.fn(),
            save: jest.fn(),
        };
        database_1.AppDataSource.getRepository.mockReturnValue(mockContractRepository);
        jest.clearAllMocks();
    });
    it("should create a contract and save it in database and redis", async () => {
        mockContractRepository.create.mockReturnValue({
            id: "mocked-uuid",
            title: "Test Contract",
            userId: "user1",
            description: "Test description",
            value: 1000,
            status: "active",
        });
        const contract = await contractService.createContract("Test Contract", "user1", "Test description", 1000);
        expect(mockContractRepository.create).toHaveBeenCalledWith({
            title: "Test Contract",
            userId: "user1",
            description: "Test description",
            value: 1000,
            status: "active",
        });
        expect(mockContractRepository.save).toHaveBeenCalledTimes(1);
        expect(redis_1.redis.set).toHaveBeenCalledWith("contract:last:user1", JSON.stringify({
            id: "mocked-uuid",
            title: "Test Contract",
            userId: "user1",
            description: "Test description",
            value: 1000,
            status: "active",
        }), "EX", 3600);
        expect(contract.status).toBe("active");
    });
});
//# sourceMappingURL=ContractService.test.js.map
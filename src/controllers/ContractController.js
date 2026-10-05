"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const ContractService_1 = require("../services/ContractService");
class ContractController {
    contractService = new ContractService_1.ContractService();
    async handle(req, res) {
        const { title, userId, description, value } = req.body;
        if (!title || !userId) {
            return res.status(400).json({ error: "Missing required fields: title, userId" });
        }
        try {
            const contract = await this.contractService.createContract(title, userId, description, value);
            return res.status(201).json({ message: "Contract created successfully", contract });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error", details: error.message });
        }
    }
}
exports.ContractController = ContractController;
//# sourceMappingURL=ContractController.js.map
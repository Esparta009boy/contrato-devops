"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ContractController_1 = require("../controllers/ContractController");
const metricsMiddleware_1 = require("../middlewares/metricsMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
const contractController = new ContractController_1.ContractController();
router.post("/contracts", (req, res, next) => contractController.handle(req, res).catch(next));
router.get("/metrics", metricsMiddleware_1.metricsController);
//# sourceMappingURL=index.js.map
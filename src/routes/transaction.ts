import { Router } from "express";
import { Authorize } from "../middlewares/authorize";
import transactionsControllers from "../controllers/transactions.controllers";
import paystackServices from "../services/paystack.services";

class TransactionRouter {
    public router: Router;
    protected authenticateService: Authorize

    constructor() {
        this.router = Router();
        this.authenticateService = new Authorize();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.use(this.authenticateService.authorize)
        this.router.get('/fund-wallet', transactionsControllers.fundWallet)

    }

}

export default new TransactionRouter().router;

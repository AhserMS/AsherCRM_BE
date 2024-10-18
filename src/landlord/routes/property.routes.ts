import { Router } from "express";
import { Authorize } from "../../middlewares/authorize";
import PropertyController from "../controllers/properties.controller";
import PropApartmentSettingsController from "../controllers/propertySetting.controller";
import upload from "../../configs/multer";
import { uploadToCloudinary } from "../../middlewares/multerCloudinary";

class ApartmentLandlordRouter {
    public router: Router;
    authenticateService: Authorize

    constructor() {
        this.router = Router()
        this.authenticateService = new Authorize()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // landlord properties
        this.router.patch('/property/showcase/:propertyId', PropertyController.showCaseRentals)
        this.router.get('/property', PropertyController.getCurrentLandlordProperties)
        this.router.post('/property', upload.array('files'), uploadToCloudinary, PropertyController.createProperty)
        this.router.delete('/property/:propertyId', PropertyController.deleteLandlordProperties)
        this.router.get('/property/showcased', PropertyController.getShowCasedRentals)

        //   settings 
        this.router.post('/settings', PropApartmentSettingsController.createPropApartmentSetting);
        this.router.get('/settings', PropApartmentSettingsController.getAllPropsApartSetting);
        this.router.get('/settings/:id', PropApartmentSettingsController.getById);
        this.router.patch('/settings/:id', PropApartmentSettingsController.updatePropsApartSetting);
        this.router.delete('/settings/:id', PropApartmentSettingsController.deletePropsApartmentSetting);
    }
}

export default new ApartmentLandlordRouter().router
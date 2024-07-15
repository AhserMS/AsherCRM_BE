import { subCategorySchema } from "../schemas/category";
import SubCategoryService from "../services/subcategory.service";
class SubCategoryControls {


    createSubCategory = async (req, res) => {
        const { error } = subCategorySchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const subCategory = await SubCategoryService.createSubCategory(req.body);
            res.status(201).json(subCategory);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Other CRUD operations
    getAllSubCategories = async (req, res) => {
        try {
            const subCategories = await SubCategoryService.getAllSubCategories();
            res.status(200).json(subCategories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getSubCategoryById = async (req, res) => {
        try {
            const subCategory = await SubCategoryService.getSubCategoryById(req.params.id);
            if (!subCategory) return res.status(404).json({ error: 'SubCategory not found' });
            res.status(200).json(subCategory);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    updateSubCategory = async (req, res) => {
        const { error } = subCategorySchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const subCategory = await SubCategoryService.updateSubCategory(req.params.id, req.body);
            if (!subCategory) return res.status(404).json({ error: 'SubCategory not found' });
            res.status(200).json(subCategory);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    deleteSubCategory = async (req, res) => {
        try {
            const subCategory = await SubCategoryService.deleteSubCategory(req.params.id);
            if (!subCategory) return res.status(404).json({ error: 'SubCategory not found' });
            res.status(200).json({ message: 'SubCategory deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

export default new SubCategoryControls()
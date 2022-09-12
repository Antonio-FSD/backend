const Category = require('../models/categoryModel.js');

const categoryController = {
    
    getAllCategories: async (req, res) => {
        const categories = await Category.find();
        res.json(categories);
    },
    getCategory:  async (req, res) => {
        const { name } = req.body;
        const categoryFound = await Category.findOne({name})
        if (!categoryFound) return res.status(500).json({
            error: 'CategoryNotFound'
        }); 
        res.json(categoryFound);
    },
    addCategory: async (req, res) => {
        const { name } = req.body;
        const categoryFound = await Category.findOne({name})
        if (categoryFound) return res.status(500).json({
            error: 'CategoryUsed'
        }); 

        const newCategory = new Category();

        newCategory.name = name;

        newCategory.save( (err, savedInfo) => {
            if(err) {
                console.log('Error', err);
            }
            res.json({message: `Categoría añadida: ${name}`});
        })
    }
} 

module.exports = categoryController;
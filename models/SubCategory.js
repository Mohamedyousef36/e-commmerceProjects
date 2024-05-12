import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
    name: {
        
        type: String,
        trim :true,
        required: [true, 'sub category name is required'],
        unique: [true, 'sub category name must be unique']
      
    },
    slug: {
        type: String,
        lowercase:true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'sub category must belonge to any category ']
    }
    
}, { timestamps: true });

export default mongoose.model('SubCategory', subCategorySchema);

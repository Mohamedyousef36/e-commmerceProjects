import mongoose from "mongoose";
// create schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'category is required'],
        unique: [true, 'category is must be unique'],
        minlength: [2, 'too short'],
        maxlength: [32, 'too long']

    },
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

// set image url
const setImageUrl = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl
    }
}
// get get all 
CategorySchema.post("init", function (doc) {
    setImageUrl(doc);
});
// create
CategorySchema.post("save", function (doc) {
    setImageUrl(doc);

});


// create and export model
export default mongoose.model('Category', CategorySchema)


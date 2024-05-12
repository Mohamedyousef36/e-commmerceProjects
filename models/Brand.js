import mongoose from "mongoose";
// create schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Brand is required'],
        unique: [true, 'Brand is must be unique'],
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
        const imageUrl = `${process.env.BASE_URL}/brands3/${doc.image}`;
        doc.image = imageUrl
    }
}
// get get all 
BrandSchema.post("init", function (doc) {
    setImageUrl(doc);
});
// create
BrandSchema.post("save", function (doc) {
    setImageUrl(doc);

});

// create and export model
export default mongoose.model('Brand', BrandSchema)


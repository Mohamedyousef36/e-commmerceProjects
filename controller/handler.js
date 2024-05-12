import asyncHandler from "express-async-handler";
import createError from "../utils/errors.js";
import apiFeateure from "../utils/apiFeature.js";



export const updateOne = (modelName) =>
    asyncHandler(async (req, res, next) => {
        const updateOne = await modelName.findByIdAndUpdate(
            { _id: req.params.id },

            req.body,

            { new: true }
        
        );
        if (!updateOne) {
            return next(new createError(`No documents Found TO Update`, 404))
        }
        // trigger save event in Review model 
        updateOne.save();
        res.status(200).send(updateOne);
    });

export const createOne = (modelName) =>
    asyncHandler(async (req, res) => {
        const createOne = await modelName.create(req.body);
        res.status(200).send(createOne);
    });

export const getOne = (modelName,populateOpt) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // build query
    let query = modelName.findById(id);
    if (populateOpt) {
      query = query.populate(populateOpt)
    }
    //Execute query
    const getOne = await query
    if (!getOne) {
        return next(new createError('No Documents Found TO Get', 404))
    }
    res.status(200).send(getOne);
});
        

export const getAllDocuments = (modelName) =>
    asyncHandler(async (req, res) => {
        let filter = {};
        if (req.filterObj) { filter = req.filterObj };
        //Build Query
        const numberOfDocuments = await modelName.countDocuments();
        const apiFeature = new apiFeateure(modelName.find(filter), req.query)
            .pagination(numberOfDocuments)
            .filtering()
            .sorting()
            .searching()
            .fields();

        //Execute Query
        const { mongooseQuery, paginationResult } = apiFeature;

        const models = await mongooseQuery;
        res.status(200).json({ result: models.length, paginationResult, data: models });
    });
    
export const deleteOne = (modelName) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedOne = await modelName.findByIdAndDelete(id);
    if (!deletedOne) {
      return next(new createError(`No Document Found To Delete`, 404));
    }
    //  trigger remove even t in Review model
    deletedOne.deleteOne(); 
    res.status(200).send(`Success Deleting of Document`);
  });

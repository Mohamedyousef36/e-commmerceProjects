class apiFeature{
    constructor(mongooseQuery, queryStr) {
        this.mongooseQuery = mongooseQuery
        this.queryStr = queryStr
    }
    filtering() {
      // ## => Filter Queries
      const queryOject = { ...this.queryStr };
      const deletedQueries = ["limit", "sort", "fields", "keyword"];
      deletedQueries.forEach((el) => {
        return delete queryOject[el];
      });
      // ## => Filtering Method
        let queryStr = JSON.stringify(queryOject); 
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
      return this;
    };
    sorting() {
      // ## => Sorting Method
      if (this.queryStr.sort) {
        this.mongooseQuery = this.mongooseQuery.sort(
          this.queryStr.sort.split(",").join(" ")
        );
      } else {
        this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
      }

      return this;
    };
    fields() {
      // ## => Fields Method
      if (this.queryStr.fields) {
      
        const fields = this.queryStr.fields.split(",").join(" ");
        this.mongooseQuery = this.mongooseQuery.select(fields);
      }
      return this;
    };
    searching() {
      // ## => Searching Method
      if (this.queryStr.keyword) {
        const query = {};
        query.$or = [
          { name: { $regex: this.queryStr.keyword, $options: "i" } },
          { desc: { $regex: this.queryStr.keyword, $options: "i" } },
        ];
        this.mongooseQuery = this.mongooseQuery.find(query);
      }
      return this;
    }
    pagination(numberOfDocuments) {
      // ## => Pagination
      const page = parseInt(this.queryStr.page ) || 1; //to convert it into number or parsInt
      const limit =parseInt(this.queryStr.limit)  || 8;
      const skip = (page - 1) * limit;
      const endIndex = page * limit;
      const pagination = {};      
      pagination.page = page;
      pagination.limit = limit;
      pagination.numberOfPage = Math.ceil(numberOfDocuments / limit);

      // ## => Next Page
      if (endIndex < numberOfDocuments) {
        pagination.next = page + 1;
      }

      // ## => Previous Page

      if (endIndex > 0) {
        pagination.prev = page - 1;
      }
      this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
      this.paginationResult = pagination;
      return this;
    };

        };

export default apiFeature;
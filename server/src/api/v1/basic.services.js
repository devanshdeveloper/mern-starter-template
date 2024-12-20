import { Response } from "../../utils/response";

// Define a generic type for documents
export default class BasicServices {
  constructor(model) {
    this.model = model;
  }

  // Generic database operations
  create = (...params) => {
    return this.model.create(...params);
  };

  exists = (...params) => {
    return this.model.exists(...params);
  };

  find = (...params) => {
    return this.model.find(...params);
  };

  findOne = (...params) => {
    return this.model.findOne(...params);
  };

  findById = (...params) => {
    return this.model.findById(...params);
  };

  findByIdAndUpdate = (...params) => {
    return this.model.findByIdAndUpdate(...params);
  };

  findByIdAndDelete = (...params) => {
    return this.model.findByIdAndDelete(...params);
  };

  deleteOne = (...params) => {
    return this.model.deleteOne(...params);
  };

  deleteMany = (...params) => {
    return this.model.deleteMany(...params);
  };

  countDocuments = (...params) => {
    return this.model.countDocuments(...params);
  };

  // Hono-compatible methods
  ["create-one"] = async (c) => {
    const { payload, data } = await c.req.json();
    try {
      const newDocument = await this.create(data);
      return Response(c)
        .body(newDocument)
        .message(`${this.model.modelName} created successfully!`)
        .status(201)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };

  ["read-one"] = async (c) => {
    const { id, select, populate } = c.req.query();

    if (!id) {
      return Response(c)
        .error({
          message: "The 'id' field is missing from the request payload.",
          name: "ValidationError",
        })
        .send();
    }

    try {
      const selectedFields = select?.split(",").join(" ") || "";
      const populateFields = populate?.split(",");

      let query = this.findById(id).select(selectedFields);

      if (populateFields && Array.isArray(populateFields)) {
        populateFields.forEach((field) => {
          query = query.populate(field);
        });
      }

      const foundDocument = await query.lean();
      if (!foundDocument) {
        return Response(c)
          .error({
            message: `${this.model.modelName} not found!`,
            name: "NotFoundError",
          })
          .send();
      }

      return Response(c)
        .body(foundDocument)
        .message(`${this.model.modelName} found successfully!`)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };

  ["read-all"] = async (c) => {
    const { select, populate } = c.req.query();

    try {
      const selectedFields = select?.split(",").join(" ") || "";
      const populateFields = populate?.split(",");

      let query = this.find({}).select(selectedFields);

      if (populateFields && Array.isArray(populateFields)) {
        populateFields.forEach((field) => {
          query = query.populate(field);
        });
      }

      const foundDocuments = await query.lean();

      if (!foundDocuments || !foundDocuments.length) {
        return Response(c)
          .error({
            message: `${this.model.modelName}s not found!`,
            name: "NotFoundError",
          })
          .send();
      }

      return Response(c)
        .body(foundDocuments)
        .message(`${this.model.modelName}s found successfully!`)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };

  ["paginate"] = async (c) => {
    const { select, populate, page, limit, search, searchFields } =
      c.req.query();
    const pageNum = parseInt(page || "1", 10);
    const limitNum = parseInt(limit || "10", 10);
    let queryObject = {};

    if (search && searchFields) {
      const fields = searchFields.split(",");
      queryObject = {
        $or: fields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      };
    }

    try {
      let query = this.find(queryObject);

      if (select) {
        query = query.select(select.split(",").join(" "));
      }

      if (populate) {
        populate.split(",").forEach((field) => {
          query = query.populate(field);
        });
      }

      const skip = (pageNum - 1) * limitNum;
      query = query.skip(skip).limit(limitNum);

      const foundDocuments = await query.lean();
      const totalDocuments = await this.countDocuments(queryObject);
      const totalPages = Math.ceil(totalDocuments / limitNum);


      if (!foundDocuments || !foundDocuments.length) {
        return Response(c)
          .paginate({
            data: foundDocuments,
            meta: {
              totalDocuments,
              totalPages,
              currentPage: page,
              limit,
              search: searchKeyword,
              searchFields,
            },
          })
          .message({
            message: `${this.model.modelName}s not found!`,
          })
          .send();
      }

      return Response(c)
        .paginate({
          data: foundDocuments,
          meta: {
            totalDocuments,
            totalPages,
            currentPage: page,
            limit,
            search: searchKeyword,
            searchFields,
          },
        })
        .message(`${this.model.modelName}s found successfully!`)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };

  ["update-one"] = async (c) => {
    const body = c?.req.body();
    const payload = body?.payload;
    const data = body?.data;
    const id = payload?.id;
    try {
      if (!id) {
        return Response(c)
          .error({
            message: "The 'id' field is missing from the request payload.",
            name: "ValidationError",
          })
          .send();
      }
      const updatedDocument = await this.findByIdAndUpdate(id, data);
      return Response(c)
        .body(updatedDocument)
        .message(`${this.modal.modelName} updated successfully!`)
        .status(200)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };
  ["delete-one"] = async (c) => {
    const body = c?.req.body();
    const payload = body?.payload;
    const data = body?.data;
    const id = payload?.id;
    try {
      if (!id) {
        return Response(c)
          .error({
            message: "The 'id' field is missing from the request payload.",
            name: "ValidationError",
          })
          .send();
      }
      const deletedDocument = await this.findByIdAndDelete(id);
      return Response(c)
        .body(deletedDocument)
        .message(`${this.model.modelName} deleted successfully!`)
        .status(200)
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };
}

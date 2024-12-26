import isThis from "@devanshdeveloper/is-this";
import { Response } from "../../utils/response";
import Roles, { getRoleByUser } from "../../constansts/roles";
import array from "../../utils/array";
import Events from "../../utils/events";
import { log } from "../../utils/logger";
import { mongooseAggregationQueryParser } from "../../utils/mongoose-aggregate-parser";
import { mongooseQueryParser } from "../../utils/mongoose-query-parser";

// Define a generic type for documents
export default class BasicServices {
  constructor(model) {
    this.model = model;
    this.setBlacklistKeysByRoles({
      [Roles.SuperAdmin]: [],
      [Roles.Admin]: [],
      [Roles.User]: [],
      [Roles.Guest]: [],
    });

    this.eventEmitter = new Events();
  }

  get events() {
    return this.eventEmitter;
  }

  // Generic database operations
  create = (...params) => {
    return this.model.create(...params);
  };
  insertMany = (...params) => {
    return this.model.insertMany(...params);
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
  aggregation = (...params) => {
    return this.model.aggregate(...params);
  };

  setBlacklistKeysByRoles(blacklistKeysByRoles) {
    const roles = Object.keys(blacklistKeysByRoles);
    let blacklistKeys = [];
    const blacklistKeysByRolesResult = {};

    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      const roleBlacklistKeys = blacklistKeysByRoles[role];
      blacklistKeys = [...blacklistKeys, ...roleBlacklistKeys];
      blacklistKeysByRolesResult[role] = blacklistKeys;
    }
    this.blacklistKeysByRoles = blacklistKeysByRolesResult;
  }

  ["create-one"] = async (c) => {
    try {
      let { data } = await c.req.json().catch(() => null).catch(() => null)
      if (!isThis.isObject(data)) {
        return Response(c).error({
          message: "The 'data' field must be an object.",
          name: "ValidationError",
        });
      }

      const keys = Object.keys(data);
      const user = c.get("user");
      const userRole = getRoleByUser(user);
      const blacklistKeys = this.blacklistKeysByRoles[userRole];
      const includedBlacklistKeys = array(keys).commonValues(blacklistKeys).arr;
      if (includedBlacklistKeys.length !== 0) {
        return Response(c).error({
          message: `You are not allowed to perform action in ${
            this.model.modelName
          } for ${includedBlacklistKeys.join(", ")} keys`,
          name: "UnauthorizedError",
        });
      }

      if (this.events.hasListners("on-create")) {
        let response = this.events.emit("on-create", {
          user,
          data,
        })[0];
        data = response.data;
      }

      const newDocument = await this.create(data);
      return Response(c)
        .body(newDocument)
        .message(`${this.model.modelName} created successfully!`)
        .status(201);
    } catch (error) {
      return Response(c).error(error);
    }
  };

  ["create-many"] = async (c) => {
    try {
      const { data } = await c.req.json().catch(() => null).catch(() => null)
      if (!isThis.isArray(data)) {
        return Response(c).error({
          message: "The 'data' field must be an array of objects.",
          name: "ValidationError",
        });
      }
      const keys = data?.flatMap((e) => Object.values(e));
      const user = c.get("user");
      const userRole = getRoleByUser(user);
      const blacklistKeys = this.blacklistKeysByRoles[userRole];
      const includedBlacklistKeys = array(keys).commonValues(blacklistKeys).arr;
      if (includedBlacklistKeys.length !== 0) {
        return Response(c).error({
          message: `You are not allowed to perform action in ${
            this.model.modelName
          } for ${includedBlacklistKeys.join(", ")} keys`,
          name: "UnauthorizedError",
        });
      }

      const newDocuments = await this.insertMany(data);
      return Response(c)
        .body(newDocuments)
        .message(`${this.model.modelName}s created successfully!`)
        .status(201);
    } catch (error) {
      return Response(c).error(error);
    }
  };

  ["read-one"] = async (c) => {
    const { id, select, populate } = c.req.query();

    if (!id) {
      return Response(c).error({
        message: "The 'id' field is missing from the request payload.",
        name: "ValidationError",
      });
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
        return Response(c).error({
          message: `${this.model.modelName} not found!`,
          name: "NotFoundError",
        });
      }

      return Response(c)
        .body(foundDocument)
        .message(`${this.model.modelName} found successfully!`);
    } catch (error) {
      return Response(c).error(error);
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
        return Response(c).error({
          message: `${this.model.modelName}s not found!`,
          name: "NotFoundError",
        });
      }

      return Response(c)
        .body(foundDocuments)
        .message(`${this.model.modelName}s found successfully!`);
    } catch (error) {
      return Response(c).error(error);
    }
  };

  ["paginate"] = async (c) => {
    const fullUrl = c.req.url;
    const queryString = fullUrl.split("?")[1] || "";
    const parsedQuery = mongooseQueryParser.parse(queryString);
    const {
      filter = {},
      select,
      sort,
      skip = 0,
      limit = 20,
      populate,
    } = parsedQuery;
    log(parsedQuery);
    try {
      let query = this.find(filter);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
      if (typeof skip === "number") query = query.skip(skip);
      if (typeof limit === "number") query = query.limit(limit);
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach((pop) => {
            query = query.populate(pop);
          });
        } else {
          query = query.populate(populate);
        }
      }

      const foundDocuments = await query.lean();
      const totalDocuments = await this.countDocuments(filter);
      const meta = {
        totalDocuments,
        parsedQuery,
        skip,
        limit,
      };
      if (!foundDocuments || !foundDocuments.length) {
        return Response(c)
          .paginate({
            data: foundDocuments,
            meta,
          })
          .message({
            message: `${this.model.modelName}s not found!`,
          });
      }

      return Response(c)
        .paginate({
          data: foundDocuments,
          meta,
        })
        .message(`${this.model.modelName}s found successfully!`);
    } catch (error) {
      return Response(c).error(error);
    }
  };

  ["aggregate"] = async (c) => {
    const fullUrl = c.req.url;
    const queryString = fullUrl.split("?")[1] || "";
    const parsedAggregation =
      mongooseAggregationQueryParser.parseAggregation(queryString);
    const {
      filter = {},
      select,
      sort,
      skip = 0,
      limit = 20,
      populate,
    } = {};
    log(parsedAggregation);
    try {
      const foundDocuments = await this.aggregation([
        {
          $facet: {
            metadata: [
              // { $match: { status: "active" } }, // Adjust your match condition if needed
              { $count: "totalDocuments" }, // Count the total matching documents
            ],
            data: [
              // { $match: { status: "active" } }, // Same match condition as above
              {
                $lookup: {
                  from: "users",
                  localField: "customer",
                  foreignField: "_id",
                  as: "customer",
                },
              },
              { $unwind: "$customer" }, // Flatten the customer array
              {
                $project: {
                  status: 1,
                  amount: 1,
                  createdAt: 1,
                  customer: { name: "$customer.name" },
                  products: { $size: "$products" },
                },
              },
              { $skip: Number(skip) }, // Apply skip
              { $limit: Number(limit) }, // Apply limit
            ],
          },
        },
      ]);
      return Response(c).body(foundDocuments).message(`${this.model.modelName}s found successfully!`);

      const meta = {
        totalDocuments,
        parsedQuery,
        skip,
        limit,
      };
      if (!foundDocuments || !foundDocuments.length) {
        return Response(c)
          .paginate({
            data: foundDocuments,
            meta,
          })
          .message({
            message: `${this.model.modelName}s not found!`,
          });
      }

      return Response(c)
        .paginate({
          data: foundDocuments,
          meta,
        })
        .message(`${this.model.modelName}s found successfully!`);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["update-one"] = async (c) => {
    const body = c?.req.json();
    const payload = body?.payload;
    const data = body?.data;
    const id = payload?.id;
    try {
      if (!id) {
        return Response(c).error({
          message: "The 'id' field is missing from the request payload.",
          name: "ValidationError",
        });
      }
      if (!isThis.isObject(data)) {
        return Response(c).error({
          message: "The 'data' field must be an object.",
          name: "ValidationError",
        });
      }

      const keys = Object.keys(data);
      const user = c.get("user");
      const userRole = getRoleByUser(user);
      const blacklistKeys = this.blacklistKeysByRoles[userRole];
      const includedBlacklistKeys = array(keys).commonValues(blacklistKeys).arr;
      if (includedBlacklistKeys.length !== 0) {
        return Response(c).error({
          message: `You are not allowed to perform action in ${
            this.model.modelName
          } for ${includedBlacklistKeys.join(", ")} keys`,
          name: "UnauthorizedError",
        });
      }

      const updatedDocument = await this.findByIdAndUpdate(id, data);
      return Response(c)
        .body(updatedDocument)
        .message(`${this.model.modelName} updated successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["update-many"] = async (c) => {
    const body = c?.req.json();
    const data = body?.data;
    const ids = Object.keys(data);
    try {
      if (!isThis.isObject(data)) {
        return Response(c).error({
          message:
            "The 'data' field must be an object of ids and data to update.",
          name: "ValidationError",
        });
      }

      const keys = Object.values(data)?.flatMap((e) => Object.values(e));
      const user = c.get("user");
      const userRole = getRoleByUser(user);
      const blacklistKeys = this.blacklistKeysByRoles[userRole];
      const includedBlacklistKeys = array(keys).commonValues(blacklistKeys).arr;
      if (includedBlacklistKeys.length !== 0) {
        return Response(c).error({
          message: `You are not allowed to perform action in ${
            this.model.modelName
          } for ${includedBlacklistKeys.join(", ")} keys`,
          name: "UnauthorizedError",
        });
      }

      const updatePromises = ids.map((id) => {
        return this.findByIdAndUpdate(id, data[id]);
      });
      const updatedDocuments = await Promise.all(updatePromises);
      return Response(c)
        .body(updatedDocuments)
        .message(`${this.model.modelName} updated successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["delete-one"] = async (c) => {
    const body = c?.req.json();
    const payload = body?.payload;
    const id = payload?.id;
    try {
      if (!id) {
        return Response(c).error({
          message: "The 'id' field is missing from the request payload.",
          name: "ValidationError",
        });
      }
      const deletedDocument = await this.findByIdAndDelete(id);
      return Response(c)
        .body(deletedDocument)
        .message(`${this.model.modelName} deleted successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["soft-delete-one"] = async (c) => {
    const body = c?.req.json();
    const payload = body?.payload;
    const id = payload?.id;
    try {
      if (!id) {
        return Response(c).error({
          message: "The 'id' field is missing from the request payload.",
          name: "ValidationError",
        });
      }
      const deletedDocument = await this.findByIdAndUpdate(id, {
        deletedAt: new Date(),
      });
      return Response(c)
        .body(deletedDocument)
        .message(`${this.model.modelName} deleted successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["soft-delete-many"] = async (c) => {
    const body = c?.req.json();
    const payload = body?.payload;
    const ids = payload?.ids;

    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return Response(c).error({
          message: "The 'ids' array is missing from the request payload.",
          name: "ValidationError",
        });
      }
      const deletedPromises = ids.map((id) => {
        return this.findByIdAndUpdate(id, {
          deletedAt: new Date(),
        });
      });
      const deletedDocuments = await Promise.all(deletedPromises);
      return Response(c)
        .body(deletedDocuments)
        .message(`${this.model.modelName} deleted successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["delete-many"] = async (c) => {
    const body = c?.req.json();
    const payload = body?.payload;
    const ids = payload?.ids;
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return Response(c).error({
          message: "The 'ids' array is missing from the request payload.",
          name: "ValidationError",
        });
      }
      const deletedDocument = await this.deleteMany(id);
      return Response(c)
        .body(deletedDocument)
        .message(`${this.model.modelName} deleted successfully!`)
        .status(200);
    } catch (error) {
      return Response(c).error(error);
    }
  };
}

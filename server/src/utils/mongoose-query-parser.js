import { log } from "./logger";

export default class MongooseQueryParser {
  constructor(options = {}) {
    this.options = options;
    this.builtInCaster = {
      string: (val) => String(val),
      date: (val) => {
        const date = new Date(val);
        if (!isNaN(date.getTime())) return date;
        throw new Error(`Invalid date string: [${val}]`);
      },
    };
    this.operators = ["select", "populate", "sort", "skip", "limit", "filter"];
    this.options.casters = Object.assign(
      this.builtInCaster,
      options.casters || {}
    );
    this.options.blacklist = options.blacklist || [];
  }

  parse(query, context = {}) {
    const params =
      typeof query === "string" ? this.parseQueryString(query) : query;

    const result = {};
    for (const operator of this.operators) {
      const key = params[operator];
      if (key) {
        const casterName = `cast${
          operator.charAt(0).toUpperCase() + operator.slice(1)
        }`;
        result[operator] = this[casterName](key, params);
      }
    }
    return this.applyPredefinedQueries(result, context);
  }

  parseQueryString(query) {
    return query.split("&").reduce((acc, pair) => {
      const [key, value] = pair.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value || "");
      return acc;
    }, {});
  }

  parseValue(value, key) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (!isNaN(value) && !/^0[0-9]+/.test(value)) return Number(value);
    const regex = value.match(/^\/(.*)\/(i?)$/);
    if (regex) return new RegExp(regex[1], regex[2]);
    if (value.includes(","))
      return value.split(",").map((v) => this.parseValue(v, key));
    const casterMatch = value.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)\((.*)\)$/);
    if (casterMatch && this.options.casters[casterMatch[1]]) {
      return this.options.casters[casterMatch[1]](casterMatch[2]);
    }
    return value;
  }

  excludeBlacklistedKeys(obj) {
    const blacklist = this.options.blacklist;
    for (const key in obj) {
      if (blacklist.includes(key)) delete obj[key];
      else if (typeof obj[key] === "object")
        this.excludeBlacklistedKeys(obj[key]);
    }
    return obj;
  }

  castFilter(filter, params) {
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const filtered = this.excludeBlacklistedKeys(parsedFilter);
    const result = {};
    for (const key in params) {
      const match = key.match(/(!?)([^><!=]+)([><]=?|!?=|)(.*)/);
      if (match) {
        const [, prefix, field, operator, value] = match;

        const parsedValue = this.parseValue(value, field);
        const opMap = {
          "=": "$eq",
          "!=": "$ne",
          ">": "$gt",
          ">=": "$gte",
          "<": "$lt",
          "<=": "$lte",
        };
        const op = opMap[operator] || "$exists";
        if (!result[field]) result[field] = {};
        if (Array.isArray(parsedValue)) {
          result[field][op === "$ne" ? "$nin" : "$in"] = parsedValue;
        } else if (op === "$exists") {
          result[field][op] = prefix !== "!";
        } else if (op === "$eq") {
          result[field] = parsedValue;
        } else {
          result[field][op] = parsedValue;
        }
      }
    }
    return { ...filtered, ...result };
  }

  castSelect(val) {
    const fields = val.split(",").reduce((acc, field) => {
      const sign = field.startsWith("-") ? 0 : 1;
      acc[field.replace(/^\+|-/, "")] = sign;
      return acc;
    }, {});
    return fields;
  }

  castPopulate(val) {
    const paths = val.split(",");
    const populates = [];
    paths.forEach((path) => {
      const [root, sub] = path.split(":");
      const existing = populates.find((p) => p.path === root);
      if (existing) {
        existing.select = existing.select ? `${existing.select} ${sub}` : sub;
      } else {
        populates.push(sub ? { path: root, select: sub } : { path: root });
      }
    });
    return populates;
  }

  castSort(val) {
    return val.split(",").reduce((acc, field) => {
      const order = field.startsWith("-") ? -1 : 1;
      acc[field.replace(/^\+|-/, "")] = order;
      return acc;
    }, {});
  }

  castSkip(val) {
    return Number(val);
  }

  castLimit(val) {
    return Number(val);
  }

  applyPredefinedQueries(query, context) {
    const replacePredefined = (obj) => {
      if (
        typeof obj === "string" &&
        obj.startsWith("${") &&
        obj.endsWith("}")
      ) {
        const key = obj.slice(2, -1);
        if (context[key] === undefined)
          throw new Error(`No predefined query found for ${key}`);
        return context[key];
      } else if (typeof obj === "object") {
        for (const key in obj) {
          obj[key] = replacePredefined(obj[key]);
        }
      }
      return obj;
    };
    return replacePredefined(query);
  }
}

const mongooseQueryParser = new MongooseQueryParser();
export { mongooseQueryParser };

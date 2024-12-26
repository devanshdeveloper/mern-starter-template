import MongooseQueryParser from "./mongoose-query-parser";

export default class MongooseAggregationQueryParser extends MongooseQueryParser {
  constructor(options = {}) {
    super(options);
    this.defaultStageOrder = [
      "filter",
      "sort",
      "skip",
      "limit",
      "project",
      "group",
    ];
    this.customStageOrder = options.stageOrder || [];
    this.aggregationStages = [
      ...new Set([...this.customStageOrder, ...this.defaultStageOrder]),
    ];
    this.blacklist = options.blacklist || [];
    this.stageSpecificBlacklist = options.stageSpecificBlacklist || {};
    this.customStages = options.customStages || {};
  }

  parseAggregation(query, context = {}) {
    const params =
      typeof query === "string" ? this.parseQueryString(query) : query;
    const pipeline = [];

    for (const stage of this.aggregationStages) {
      const value = params[stage];
      if (value) {
        const casterName = `cast${
          stage.charAt(0).toUpperCase() + stage.slice(1)
        }`;
        if (this[casterName]) {
          const stageValue = this[casterName](value, params);
          if (stageValue) {
            const aggregationStage = this.mapStageToOperator(stage, stageValue);
            if (aggregationStage) pipeline.push(aggregationStage);
          }
        }
      }
    }

    // Add custom stages if provided
    Object.entries(this.customStages).forEach(([key, handler]) => {
      if (params[key]) {
        const stageValue = handler(params[key], params);
        if (stageValue) pipeline.push(stageValue);
      }
    });

    // Remove blacklisted fields
    const orderedPipeline = this.reorderPipeline(pipeline);
    return this.applyPredefinedQueries(
      this.excludeBlacklistedFields(orderedPipeline),
      context
    );
  }

  reorderPipeline(pipeline) {
    const orderedPipeline = [];
    const stageOrder = [
      ...new Set([...this.customStageOrder, ...this.defaultStageOrder]),
    ];

    stageOrder.forEach((stageName) => {
      pipeline.forEach((stage) => {
        if (
          Object.keys(stage)[0] === this.mapStageToOperator(stageName, {}).key
        ) {
          orderedPipeline.push(stage);
        }
      });
    });

    // Add any remaining stages not explicitly ordered
    const remainingStages = pipeline.filter(
      (stage) => !orderedPipeline.includes(stage)
    );
    return [...orderedPipeline, ...remainingStages];
  }

  mapStageToOperator(stage, value) {
    const stageOperatorMap = {
      filter: { $match: value },
      sort: { $sort: value },
      skip: { $skip: value },
      limit: { $limit: value },
      project: { $project: value },
      group: { $group: value },
    };
    return stageOperatorMap[stage];
  }

  castProject(val) {
    return JSON.parse(val);
  }

  castGroup(val) {
    return JSON.parse(val);
  }

  excludeBlacklistedFields(pipeline) {
    return pipeline.map((stage) => {
      const stageKey = Object.keys(stage)[0];
      if (this.stageSpecificBlacklist[stageKey]) {
        stage[stageKey] = this.excludeBlacklistedKeys(
          stage[stageKey],
          this.stageSpecificBlacklist[stageKey]
        );
      } else {
        stage[stageKey] = this.excludeBlacklistedKeys(
          stage[stageKey],
          this.blacklist
        );
      }
      return stage;
    });
  }

  excludeBlacklistedKeys(obj, blacklist) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.excludeBlacklistedKeys(item, blacklist));
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (blacklist.includes(key)) delete obj[key];
        else obj[key] = this.excludeBlacklistedKeys(obj[key], blacklist);
      }
    }
    return obj;
  }
}
const mongooseAggregationQueryParser = new MongooseAggregationQueryParser();
export { mongooseAggregationQueryParser };

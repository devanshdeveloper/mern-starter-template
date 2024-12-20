export default class ResponseHandler {
  constructor(ctx) {
    this.ctx = ctx;
    this.response = [
      {
        error: false,
        success: true,
        data: null,
        message: "",
        pagination: {},
        status: 200,
      },
      { status: 200, headers: {} },
    ];
  }

  status(code) {
    this.response[0].status = code;
    this.response[1].status = code;
    return this;
  }

  body(data) {
    this.response[0].data = data;
    return this;
  }

  message(text) {
    this.response[0].message = text;
    return this;
  }

  headers(headers) {
    this.response[1].headers = {
      ...this.response[1].headers,
      ...headers,
    };
    return this;
  }

  error(errorObj) {
    // Duplicate Key Error (e.g., email already exists)
    if (errorObj.code === 11000) {
      this.status(409); // Conflict
      const duplicateField = Object.keys(errorObj.keyValue)[0]; // e.g., 'email'
      const duplicateValue = errorObj.keyValue[duplicateField]; // e.g., 'test@test.com'
      this.response[0].message = `The ${duplicateField} '${duplicateValue}' is already registered. Please use a different ${duplicateField}.`;
    }

    // Validation Errors
    if (errorObj.name === "ValidationError") {
      this.status(422); // Unprocessable Entity
      if (errorObj.errors) {
        const fieldErrors = {};
        for (const field in errorObj.errors) {
          fieldErrors[field] = errorObj.errors[field].properties.message;
        }
        this.response[0].message =
          "Validation failed. Please provide all required fields.";
        this.response[0].error = fieldErrors;
      }
      if (!this.response[0].message) {
        this.response[0].message = errorObj.message || "Validation failed.";
      }
    }

    // Handle other errors
    const errorMapping = {
      CastError: {
        status: 400,
        message: `Invalid value for field '${errorObj.path}': ${errorObj.value}`,
      },
      UnauthorizedError: {
        status: 401,
        message: "Unauthorized access. Authentication is required.",
      },
      ForbiddenError: {
        status: 403,
        message: "Forbidden. You don't have permission to perform this action.",
      },
      NotFoundError: {
        status: 404,
        message: errorObj.message || "Resource not found.",
      },
      RateLimitError: {
        status: 429,
        message: "Too many requests. Please try again later.",
      },
      MongoNetworkError: {
        status: 503,
        message: "Database connection failed. Please try again later.",
      },
      TimeoutError: {
        status: 408,
        message: "Request timed out. Please try again.",
      },
    };

    if (errorObj.name in errorMapping) {
      const { status, message } = errorMapping[errorObj.name];
      this.status(status);
      this.response[0].message = message;
    }

    // Default to Internal Server Error
    if (!this.response[0].message) {
      this.response[0].message = errorObj.message || "Something went wrong!";
    }

    if (this.response[1].status === 200) {
      this.status(500); // Default to Internal Server Error
    }

    this.response[0].error = this.response[0].error || errorObj;
    this.response[0].success = false;

    return this;
  }

  paginate(pageObj) {
    this.response[0].pagination = pageObj;
    return this;
  }

  send() {
    const { status } = this.response[1];
    const headers = this.response[1].headers;
    const body = this.response[0];

    return this.ctx.body(JSON.stringify(body), status, headers);
  }
}

export const Response = (ctx) => {
  return new ResponseHandler(ctx);
};

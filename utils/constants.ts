const HTTP_ERROR_MESSAGES = {
  400: "Invalid request",
  401: "You are not signed in",
  403: "You do not have permission to do this operation",
  404: "The requested roussource was not found",
  405: "Method not allowed on this route",
  409: "The roussource that you have tried to create already exists",
  500: "The server has encountered an unexpected error"
};

const MIN_WIDTH = 768;

export { HTTP_ERROR_MESSAGES, MIN_WIDTH };

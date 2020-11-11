const Page = {
  required: ["name"],
  properties: {
    "name": {
      type: "string"
    },
    "id": {
      type: "string"
    },
    "noOfLikes": {
      type: "number"
    }
  }
};

const Error = {
  required: ["error"],
  properties: {
    "error": {
      type: "string"
    }
  }
};

export const savePage = {
  tags: ['Page'],
  description: "Register a new page that would get access to a like button.",
  operationId: 'savePage',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    "description": "page to be added to the list of pages",
    "content": {
      "application/json": {
        "schema": Page,
        "examples": {
          "page": {
            summary: "Sample page to be registered",
            value: {
              name: "Testing 1234"
            }
          }
        }
      },
    }
  },
  responses: {
    "201": {
      description: "A page that was added.",
      "content": {
        "application/json": {
          schema: Page
        }
      }
    },
    "400": {
      description: "Bad request from client",
      content: {
        "application/json": {
          schema: Error
        }
      }
    }
  }
};

export const likePage = {
  tags: ['Page'],
  description: "Like a page.",
  operationId: 'likePage',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
    "name": "pageId",
    "in": "path",
    "description": "the id of the page to be liked.",
    "required": true,
    "schema": {
      "type": "string"
    }
  }],
  responses: {
    "200": {
      description: "A page that was like with the updated like count.",
      "content": {
        "application/json": {
          schema: Page
        }
      }
    },
    "400": {
      description: "Bad request from client",
      content: {
        "application/json": {
          schema: Error
        }
      }
    }
  }
};

export const getPageById = {
  tags: ['Page'],
  description: "Get page info by the id.",
  operationId: 'getPageById',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
    "name": "pageId",
    "in": "path",
    "description": "the id of the page to be fetched.",
    "required": true,
    "schema": {
      "type": "string"
    }
  }],
  responses: {
    "200": {
      description: "A page that was successfully fetched.",
      "content": {
        "application/json": {
          schema: Page
        }
      }
    },
    "400": {
      description: "Bad request from client",
      content: {
        "application/json": {
          schema: Error
        }
      }
    }
  }
};
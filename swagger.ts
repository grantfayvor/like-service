import { getPageById, likePage, savePage } from "./src/openAPI/pages.swagger";

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document for Like Service',
    description: 'Backend api specs for like service',
    termsOfService: '',
    contact: {
      name: 'Harrison Favour',
      url: 'https://www.hyperdebugger.dev'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local server'
    },
    {
      url: 'https://like-service-295414.uc.r.appspot.com/api',
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: "Page"
    }
  ],
  paths: {
    "/page": {
      "post": savePage
    },
    "/page/{pageId}": {
      "get": getPageById,
      "put": likePage
    }
  }
}
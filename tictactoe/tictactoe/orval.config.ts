import { defineConfig } from 'orval';

/*
  Basic Orval config with Zod schema generation.
  - Set the OPENAPI_URL env var to point at your OpenAPI document (URL or file path),
    otherwise it defaults to the public Petstore example.
  - Generated files will be placed under ./src/api/generated/
  - Requires: orval (v6.20+) and zod installed in your project.

  Usage:
    npx orval --config orval.config.ts
*/

export default defineConfig({
  api: {
    input: {
      // You can also use a local path like './openapi.yaml'
      target: process.env.OPENAPI_URL || 'https://petstore3.swagger.io/api/v3/openapi.json',
    },
    output: {
      // Single bundle for operations/types
      target: './src/api/generated/client.ts',
      // Folder for model files (and Zod schemas)
      schemas: './src/api/generated/schemas',
      // Use fetch-based client; change to 'axios' or 'react-query' if desired
      client: 'fetch',
      // Keep it simple; split by tags if you prefer ('tags-split')
      mode: 'single',
      // Generate Zod validators alongside TS types
      // NOTE: Requires orval with Zod support
      validation: 'zod',
      // Format generated code with Prettier (if available)
      prettier: true,
    },
  },
});

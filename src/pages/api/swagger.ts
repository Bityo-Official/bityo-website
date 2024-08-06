import { NextApiRequest, NextApiResponse } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import path from 'path';

const swaggerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BITYO OFFICIAL API',
        version: '1.0.0',
      },
    },
    apis: [path.resolve(process.cwd(), 'src/pages/api/**/*.ts')],
  });
  res.status(200).json(spec);
};

export default swaggerHandler;

import { NextApiRequest, NextApiResponse } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import path from 'path';

const swaggerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const apiPath = path.resolve(process.cwd(), 'src/pages/api/**/*.ts');
  console.log("Resolved API path:", apiPath); // 记录路径，便于在Vercel日志中查看

  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BITYO OFFICIAL API',
        version: '1.0.0',
      },
    },
    apiFolder: "src/pages/api",
    // apis: [apiPath],
  });
  res.status(200).json(
      spec
  );
};

export default swaggerHandler;
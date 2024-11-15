import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { dataSource } from './config/database/dataSource';
import { faker } from '@faker-js/faker';
import { Product } from './domain/entities/product';

//Configurar a obtenção do arquivo .env
dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log('Data source inicializado');
  })
  .catch((err) => {
    console.error('Erro ao inicializar dataSource', err);
    process.exit('SIGINT');
  });

// Criando instancia do express
const app = express();

// Configurar middleware que transforma a string das requests em json
app.use(express.json());

//Configurar rota inicial do aplicativo
//A rota foi configurada para que independente do path, essa rota seja executada
app.post('*', async (req: Request, res: Response) => {
  const queryRunner = dataSource.createQueryRunner();
  try {
    queryRunner.connect();
    const interval = setInterval(async () => {
      try {
        const productRepository = queryRunner.manager.getRepository(Product);
        const product = productRepository.create({
          category: faker.commerce.product(),
          description: faker.commerce.productName(),
          value: faker.finance.amount(),
          createdBy: 'Késsia Rodrigues',
        });
        await productRepository.insert(product);
        console.table(product);

        const lastIds = await productRepository.find({
          order: { id: 'DESC' },
          select: ['id'],
          take: 10,
          skip: 1,
        });

        for (let index = 0; index < lastIds.length; index++) {
          console.table(await productRepository.findOneBy(lastIds[index]));
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
      }
    }, 500);

    res.status(200).json({ message: 'hello world' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ocorreu um erro inesperado!', stack: err });
  } finally {
    // queryRunner.release();
  }
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

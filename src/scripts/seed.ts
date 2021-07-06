import { connectDb } from '../config';
import { IUserModel } from '../models';
import { authService, petService, userService } from '../services';

const createUsers = async () => {
  const username = 'tadeu';

  const exists = await userService.getByUsername(username);

  if (exists) {
    return [exists];
  }

  const user = await userService.create({
    username,
    password: await authService.hashPassword('123'),
    name: 'tadeu',
    foto: 'https://avatars.githubusercontent.com/u/10122339?s=460&v=4',
    email: 'tadeu@a.com',
    telefone: '999999',
    sobre: 'lindo',
    pets: [],
    uf: 'ES',
    cidade: 'Cariacica',
    bank_information: {
      pix_key: 'aljsq3nc8nzsfzs123f41s4sg684s4g6d4',
    },
  });
  // eslint-disable-next-line no-console
  console.log(`User ${user.name} created!`);

  return [user];
};

const createPets = async (user: IUserModel) => {
  const pet = await petService.create({
    name: 'Primeiro PET',
    foto:
      'https://static1.patasdacasa.com.br/articles/8/17/28/@/8317-o-vira-lata-e-o-melhor-amigo-de-quatro-p-articles_media_desktop-1.jpg',
    porte: 'médio',
    sobre: 'Este cachorro é lindo',
    idade: 1,
    foiAdotado: false,
    userId: user.id,
  });

  return [pet];
};

const main = async () => {
  await connectDb();
  // eslint-disable-next-line no-console
  console.log('Creating users...');
  const [user] = await createUsers();
  // eslint-disable-next-line no-console
  console.log('Creating pets...');
  await createPets(user);
};

main()
  .then(() => process.exit(0))
  .catch((e: any) => {
    // eslint-disable-next-line no-console
    console.log(e);
    process.exit(1);
  });

import { factor } from '@/interpreter/factor';

describe('factor', () => {
  test('1', () => {
    const ast = {
      name: 'Factor',
      children: {
        NumberLiteral: [
          {
            image: '1',
          },
        ],
      },
    };
  });
});

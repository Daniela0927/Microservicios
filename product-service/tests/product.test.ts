
import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Product creation with totalValue calculation', () => {
  test('should calculate totalValue as price * quantity', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: 100 });

    const price = 10;
    const quantity = 10;

    const response = await axios.post('http://calculation-service:5000/calculate', {
      price,
      quantity
    });

    expect(response.data).toBe(100);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://calculation-service:5000/calculate',
      { price, quantity }
    );
  });
});

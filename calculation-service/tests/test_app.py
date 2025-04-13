
import unittest
from app import app

class TestCalculationService(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_calculate_success(self):
        response = self.client.post('/calculate', json={
            'price': 5,
            'quantity': 4
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, 20.0)

    def test_calculate_missing_data(self):
        response = self.client.post('/calculate', json={
            'price': 5
        })
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()

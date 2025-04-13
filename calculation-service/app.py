
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    price = data.get('price')
    quantity = data.get('quantity')

    if price is None or quantity is None:
        return jsonify({'error': 'Faltan datos'}), 400

    try:
        total = float(price) * float(quantity)
        return jsonify(total)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

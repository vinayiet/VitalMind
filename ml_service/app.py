from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Mind Energy Analyser!"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    # Placeholder for analysis logic
    result = {"status": "success", "data": data}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
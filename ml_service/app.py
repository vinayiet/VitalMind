from flask import Flask, request, jsonify
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

app = Flask(__name__)

# Function to get sentiment
def analyze_sentiment(text):
    score = sia.polarity_scores(text)
    if score['compound'] >= 0.05:
        return "Positive"
    elif score['compound'] <= -0.05:
        return "Negative"
    else:
        return "Neutral"

# Function to suggest remedies
def suggest_remedy(symptom):
    remedies = {
        "headache": "Drink plenty of water, rest in a dark room, and try ginger tea.",
        "fever": "Stay hydrated, take paracetamol, and get plenty of rest.",
        "cough": "Drink warm honey lemon water, use a humidifier, and avoid cold drinks.",
        "anxiety": "Try meditation, deep breathing exercises, and maintain a healthy sleep routine."
    }
    return remedies.get(symptom.lower(), "No specific remedy found. Consult a doctor.")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text")
    symptom = data.get("symptom")

    if not text or not symptom:
        return jsonify({"error": "Missing text or symptom"}), 400

    sentiment = analyze_sentiment(text)
    remedy = suggest_remedy(symptom)

    return jsonify({"sentiment": sentiment, "remedy": remedy})

if __name__ == "__main__":
    app.run(port=5003, debug=True)

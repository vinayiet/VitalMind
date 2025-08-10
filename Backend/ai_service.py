from transformers import pipeline

# Load sentiment analysis model
sentiment_pipeline = pipeline("sentiment-analysis")

# Crisis keywords
CRISIS_KEYWORDS = ["suicide", "die", "kill myself", "end it all", "useless", "hopeless"]

def analyze_message(message: str):
    result = sentiment_pipeline(message)[0]
    sentiment = result['label']
    score = result['score']

    risk = 0
    # Crisis keyword detection
    for word in CRISIS_KEYWORDS:
        if word in message.lower():
            risk = max(risk, 0.9)

    # Very negative sentiment also increases risk
    if sentiment == "NEGATIVE" and score > 0.8:
        risk = max(risk, 0.8)

    return {"sentiment": sentiment, "score": score, "risk": risk}

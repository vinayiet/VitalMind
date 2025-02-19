
# **MERN-Based Disease Prediction & Sentiment Analysis System**
This project is a **MERN Stack-based Web Application** that predicts diseases based on user symptoms, performs **Sentiment Analysis**, and provides **Home Remedies**.  
Additionally, it integrates a **Flask-based AI service** for natural language processing (NLP) tasks.  

---

## **📌 Features**
✅ User can enter symptoms to predict possible diseases  
✅ Sentiment analysis to determine the mood of the patient  
✅ Suggests home remedies based on symptoms  
✅ Built using **MERN (MongoDB, Express.js, React.js, Node.js)** for full-stack development  
✅ **Flask API** for NLP-based sentiment and remedy suggestions  

---

## **📌 Tech Stack**
| Technology    | Usage |
|--------------|-------|
| React.js     | Frontend |
| Node.js      | Backend |
| Express.js   | Backend API |
| MongoDB      | Database |
| Flask        | AI Service for NLP |
| Axios        | API Requests |
| NLTK         | Sentiment Analysis |

---

## **📌 Project Folder Structure**
```
MERN-Disease-Predictor/
│── backend/                   # Node.js + Express API
│   ├── controllers/            # API logic
│   │   ├── thoughtController.js  # Handles sentiment & remedy logic
│   ├── routes/                 # API routes
│   │   ├── thoughtRoutes.js     # Routes for sentiment API
│   ├── models/                 # Mongoose schemas (if needed)
│   ├── server.js               # Main server file
│
│── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThoughtLogger.js  # User input form & display results
│   │   ├── api.js               # Handles API calls
│   │   ├── App.js               # Main component
│   │   ├── index.js             # React entry point
│
│── ml_service/                 # AI Service using Flask
│   ├── app.py                   # Main Flask API
│   ├── requirements.txt          # Dependencies for Flask API
│
│── README.md                   # Project Documentation
```

---

## **📌 Code Flow and Functionality**

### **1️⃣ Frontend (`frontend/src/`)**
| File | Function |
|------|----------|
| `components/ThoughtLogger.js` | Collects user symptoms & sends to backend for analysis |
| `api.js` | Handles API requests to backend for sentiment analysis & remedies |
| `App.js` | Loads the main app & renders ThoughtLogger component |
| `index.js` | React app entry point |

#### **ThoughtLogger.js**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await addThought(text, category);
  const response = await analyzeThought(text, symptom);
  setAnalysis(response.data);
};
```
**What it does?**  
- Sends user input (`text`, `symptom`) to the backend  
- Backend processes the request and returns **sentiment & remedies**  
- Stores the analysis results and displays them  

---

### **2️⃣ Backend (`backend/`)**
| File | Function |
|------|----------|
| `controllers/thoughtController.js` | Calls Flask API for NLP analysis |
| `routes/thoughtRoutes.js` | Defines API endpoints |
| `server.js` | Initializes Express server |

#### **thoughtController.js**
```javascript
exports.analyzeThought = async (req, res) => {
    try {
        const { text, symptom } = req.body;
        const response = await axios.post("http://localhost:5001/analyze", { text, symptom });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to analyze sentiment" });
    }
};
```
**What it does?**  
- Receives text & symptoms from frontend  
- Calls **Flask API (`http://localhost:5001/analyze`)** for sentiment & remedy  
- Sends response back to the frontend  

#### **thoughtRoutes.js**
```javascript
router.post("/analyze", analyzeThought);
```
**What it does?**  
- Defines the `/api/thoughts/analyze` route  
- Calls `analyzeThought` function  

#### **server.js**
```javascript
app.use("/api/thoughts", thoughtRoutes);
```
**What it does?**  
- Connects Express routes to the backend  

---

### **3️⃣ Flask API (`ml_service/`)**
| File | Function |
|------|----------|
| `app.py` | Hosts the NLP API |
| `requirements.txt` | Stores Python dependencies |

#### **app.py**
```python
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text")
    symptom = data.get("symptom")

    sentiment = analyze_sentiment(text)
    remedy = suggest_remedy(symptom)

    return jsonify({"sentiment": sentiment, "remedy": remedy})
```
**What it does?**  
- Receives user input (`text`, `symptom`)  
- Calls **Sentiment Analysis (`analyze_sentiment()`)**  
- Calls **Remedy Suggestion (`suggest_remedy()`)**  
- Returns response to Node.js backend  

---

## **📌 How to Run the Project**
### **1️⃣ Start Flask Server**
```bash
cd ml_service
python app.py
```
Runs on **`http://localhost:5001/analyze`**

---

### **2️⃣ Start Backend**
```bash
cd backend
npm install  # Install dependencies
nodemon server.js  # Start server
```
Runs on **`http://localhost:5000/api/thoughts/analyze`**

---

### **3️⃣ Start Frontend**
```bash
cd frontend
npm install  # Install dependencies
npm start  # Start React app
```
Runs on **`http://localhost:3000/`**

---

## **📌 API Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/thoughts/analyze` | Takes user input and returns sentiment & remedy |

#### **Example Request:**
```json
{
  "text": "I am feeling very stressed and exhausted.",
  "symptom": "anxiety"
}
```
#### **Example Response:**
```json
{
  "sentiment": "Negative",
  "remedy": "Try meditation, deep breathing exercises, and maintain a healthy sleep routine."
}
```

---

## **📌 Future Enhancements**
- **Doctor Recommendations** using external APIs  
- **More NLP Models** for better sentiment detection  
- **User Authentication** for personalized history tracking  

---

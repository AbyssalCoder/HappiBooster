# 🎭 MoodMirror

**Emotion Detection & Wellness Companion**

MoodMirror is a full-stack web application that analyzes emotions from text and facial expressions, then provides personalized wellness suggestions to help improve your mood.

## ✨ Features

- **Text-based Emotion Detection**: Analyze emotions from written text using advanced NLP
- **Facial Emotion Recognition**: Detect emotions from facial expressions in images
- **Personalized Suggestions**: Get tailored wellness tips, breathing exercises, and activities
- **Confidence Scores**: See how confident the AI is in its emotion detection
- **Modern UI**: Beautiful, calming interface with smooth animations
- **Privacy-Focused**: All processing happens locally - no data is stored

## 🎯 Detected Emotions

- Happy 😊
- Sad 😢
- Stressed 😰
- Angry 😠
- Neutral 😐
- Fear 😨
- Surprise 😲

## 🛠️ Technology Stack

### Backend
- **Flask** - Python web framework
- **OpenAI GPT-3.5-turbo** - Dynamic, context-aware response generation
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with glassmorphism effects
- **Vanilla JavaScript** - No frameworks, pure JS

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- OpenAI API key (get one from https://platform.openai.com)

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd c:\Users\Aniket\OneDrive\Desktop\CascadeProjects\meme
   ```

2. **Set up your OpenAI API Key**
   
   On Windows, set the environment variable:
   ```powershell
   $env:OPENAI_API_KEY = "your-api-key-here"
   ```
   
   Or create a `.env` file in the project directory with:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask app**
   ```bash
   python app.py
   ```

5. **Open in your browser**
   Navigate to `http://localhost:5000`

## 🚀 How It Works

### Dynamic Response Generation

Unlike pre-defined responses, this app now uses **OpenAI's GPT-3.5-turbo model** to generate unique, contextually-aware responses to user queries:

- **Chat Companion**: Every message you send gets a personalized response based on the content, context, and conversation history
- **Selfie Compliments**: Dynamic compliments and self-care suggestions are generated based on your interaction
- **Conversation Memory**: The app maintains conversation history for more coherent and contextual responses

### API Endpoints

#### POST `/api/support-chat`
Generates a supportive, empathetic response to user messages.

**Request:**
```json
{
  "message": "I'm feeling overwhelmed",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}
```

**Response:**
```json
{
  "reply": "I hear you - feeling overwhelmed is tough. Try taking a few deep breaths and breaking your tasks into smaller, manageable steps. Remember, you don't have to tackle everything at once."
}
```

#### POST `/api/selfie-compliment`
Generates a unique, personalized compliment and self-care suggestion.

**Request:**
```json
{
  "image": [file data]
}
```

**Response:**
```json
{
  "compliment": "Your authentic energy radiates through - you have a genuine presence that people connect with. Take a moment to journal about something you're proud of today."
}

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   ⚠️ **Note**: First installation will download AI models (~500MB). This is a one-time download.

## 🚀 Running the Application

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to: `http://localhost:5000`

3. **Start analyzing!**
   - Enter text describing your feelings, or
   - Upload a photo of your face

## 📖 Usage

### Text Analysis
1. Type or paste text describing how you're feeling
2. Click "Analyze My Emotions"
3. View your detected emotion, confidence score, and personalized suggestions

### Image Analysis
1. Click "Choose an image" and select a photo of your face
2. Click "Analyze My Expression"
3. View your detected emotion, confidence score, and personalized suggestions

## 🔒 Privacy & Ethics

**Important**: This tool is for entertainment and wellness purposes only. It is **not** a substitute for professional medical or mental health advice, diagnosis, or treatment.

- No data is stored or transmitted to external servers
- All processing happens locally on your machine
- Images are temporarily processed and immediately deleted
- If you're experiencing serious emotional distress, please consult a qualified healthcare provider

## 🎨 Features Highlight

- **Real-time Analysis**: Fast emotion detection powered by pre-trained models
- **Visual Feedback**: Color-coded emotions with smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: High contrast, readable fonts, semantic HTML

## 🧪 Example Inputs

### Text Examples
- **Happy**: "I just got promoted at work! I'm so excited and grateful!"
- **Sad**: "I feel lonely and everything seems hopeless today"
- **Stressed**: "I have so many deadlines and I can't keep up with everything"
- **Angry**: "This situation is so frustrating and unfair!"

### Image Requirements
- Clear, well-lit photo of face
- Face should be visible and not obscured
- Supported formats: JPG, PNG, WEBP
- Recommended: Front-facing, neutral background

## 🐛 Troubleshooting

### Models not loading
- Ensure you have a stable internet connection for first-time model download
- Check that you have enough disk space (~1GB free)

### Image analysis fails
- Ensure the image contains a visible face
- Try a different image with better lighting
- Supported formats: JPG, PNG, WEBP

### Port already in use
- Change the port in `app.py`: `app.run(debug=True, port=5001)`
- Update the API URL in `script.js` accordingly

## 📝 License

This project is for educational and personal use.

## 🙏 Acknowledgments

- Hugging Face for the transformers library
- DeepFace for facial emotion recognition
- Flask for the web framework

---

**Made with ❤️ for emotional wellness**

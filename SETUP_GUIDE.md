# 🚀 Setup Guide - Sunny Chat Companion with LLM

## What Changed?

Your app now uses **OpenAI's GPT-3.5-turbo model** to generate dynamic, unique responses instead of pre-defined answers. Every conversation will be different and contextually relevant.

## Quick Setup

### 1. Get Your OpenAI API Key

1. Go to https://platform.openai.com
2. Sign up or log in to your account
3. Navigate to **API keys** section
4. Create a new API key
5. Copy your API key

### 2. Set Environment Variable (Windows)

Open PowerShell in the project directory and run:

```powershell
$env:OPENAI_API_KEY = "your-api-key-here"
```

### 3. Activate Virtual Environment (if applicable)

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the App

```bash
python app.py
```

The app will be available at `http://localhost:5000`

## Features

✅ **Dynamic Responses**: Every response is generated fresh by GPT-3.5-turbo based on your input
✅ **Conversation History**: The model remembers previous messages in the conversation
✅ **Context-Aware**: Responses are personalized and take into account what you've shared
✅ **No Pre-defined Templates**: No more repetitive canned responses!
✅ **Warm & Empathetic**: The system prompt ensures responses are supportive and caring

## API Endpoints

### Chat Support
**POST** `/api/support-chat`

Send a message and get a personalized response:

```json
{
  "message": "I'm feeling stressed about my upcoming presentation",
  "history": []
}
```

### Selfie Compliment
**POST** `/api/selfie-compliment`

Get a unique compliment and self-care suggestion with an image file.

## Troubleshooting

### "Invalid API Key" Error
- Check that your API key is correctly set
- Make sure you're using a valid OpenAI API key (not an organization key)
- Verify the key doesn't have any extra spaces

### "Rate Limit Exceeded"
- OpenAI has usage limits. Wait a few moments before making new requests
- Check your API usage at https://platform.openai.com/account/usage/overview

### "Model not found"
- Make sure your API key has access to gpt-3.5-turbo model
- Some older API keys might need to be updated to access newer models

## Customization

You can modify the system prompt in `app.py` to change the personality of the chat companion:

```python
SYSTEM_PROMPT = """Your custom prompt here"""
```

Adjust temperature settings for different response styles:
- Lower temperature (0.3-0.5): More consistent, focused responses
- Higher temperature (0.8+): More creative, varied responses

## Cost Note

OpenAI API calls are not free, but they're very affordable. GPT-3.5-turbo is one of the cheapest models. Check your usage periodically at https://platform.openai.com/account/usage/overview

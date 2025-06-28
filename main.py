from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json
import re

load_dotenv("keys.env")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-2.0-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ThoughtRequest(BaseModel):
    thought: str

@app.post("/analyze")
async def analyze(req: ThoughtRequest):
    prompt = f"""
You are a mental wellness chatbot. A user will send a short thought or concern.
You should respond with:

1. A short, kind chatbot response that shows empathy and offers to help.
2. An analysis of the emotion or feeling expressed (e.g. anxiety, stress, hope, motivation, sadness).
3. A suggested action or reframe the user can try (e.g. deep breaths, talk to someone, positive affirmation, etc.).

Respond only in this strict JSON format:
{{
  "response": "...",     # what the chatbot would say
  "emotion": "...",      # emotion felt in user's message
  "action": "..."        # helpful suggestion
}}

User: "{req.thought}"
"""

    gemini_response = model.generate_content(prompt)
    response_text = gemini_response.text

    # Extract JSON from text response
    match = re.search(r"\{[\s\S]*\}", response_text)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            return {"response": "I'm here for you.", "emotion": "Unclear", "action": "Try expressing your thoughts again."}

    return {"response": "I'm here to support you.", "emotion": "Unrecognized", "action": "Please try rephrasing your thought."}

import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("GROQ_API_KEY")
openai.api_base = "https://api.groq.com/openai/v1"

def get_llm_response(message_history):
    response = openai.ChatCompletion.create(
        model="mixtral-8x7b-32768",  # or use "llama3-8b-8192"
        messages=message_history,
        temperature=0.7
    )
    return response['choices'][0]['message']['content']

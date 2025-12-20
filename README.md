# Moodie_AI
Moodie AI app built for Life advice and Mental health
# Installation and Running

## Ollama
 Model Name: Moodie:b
1. Download and Install Ollama on the official installer (Docker was not used).
2. Start the Ollama server
   Run:
    ollama serve
3. Create and build an Ollama Model
   # Download Ollama model
      ollama pull llama3.2:1b(or any model you like)
   # Create Ollama Modelfile or Model configuration file
   # Create CLI chatbot script as faq.py
4. Build and Run your Model
   # Build Model:
      ollama create Moodie:b( or your own model name) -f Modelfile
   # Run your Model:
      Go to your Model script or faq.py then click the Play button on header side and run
      GO to Ollama app and choose your Model name and run

## Python Backend
1. Install Python dependencies
2. Create a venv folder:
    python -m venv venv
3. Go to your Server or Backend directory
4. Start venv folder
    venv\Scripts\activate
4. Start the server with a command like:
    uvicorn server:app --reload --port 3000

## Frontend
1. Install frontend dependencies:
   npm install
2. Install CSS framework:
    npm install tailwindcss @tailwindcss/vite
    npx shadcn@latest init
3. Go to Client or Frontend directory
4. Start the frontend development server:
   npm run dev
## 5 Minutes AI Demo videos link here: https://drive.google.com/drive/folders/17Aemtjvfs7OAiz62Vcj-162SV4GmcQjT?usp=sharing
## For Streaming Flow and Model Explanation click the Read-MeFlow.md inside Client Folder


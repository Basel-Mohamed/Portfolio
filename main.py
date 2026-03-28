from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import httpx
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# 1. The Chat API Endpoint
@app.post("/api/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    message = data.get("message")
    chat_history = data.get("chat_history", [])
    preamble = data.get("preamble", "")
    temperature = data.get("temperature", 0.3)

    api_key = os.environ.get("COHERE_API_KEY") or os.environ.get("VITE_COHERE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured securely on server.")

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.cohere.com/v1/chat",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                json={
                    "message": message,
                    "model": "command-r7b-12-2024",
                    "preamble": preamble,
                    "temperature": temperature,
                    "chat_history": chat_history
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

# 2. Serve Vite's static assets
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

# 3. Catch-all for React Router
@app.api_route("/{path_name:path}", methods=["GET"])
async def catch_all(path_name: str):
    file_path = f"dist/{path_name}"
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("dist/index.html")
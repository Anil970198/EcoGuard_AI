from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
# Import our AI Service
import sys
import os

# Add current directory to path so we can import ai_service
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ai_service import classify_image, get_risk_map, RiskPoint

app = FastAPI(title="Wildlife Collision AI API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskRequest(BaseModel):
    lat: float
    lng: float

@app.get("/")
def read_root():
    return {"status": "EcoGuard AI Backend Running"}

@app.post("/predict_animal")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        image_bytes = await file.read()
        predictions = classify_image(image_bytes)
        return {"predictions": predictions}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/risk_map", response_model=List[RiskPoint])
def risk_map(lat: float, lng: float):
    # Retrieve risk points based on center lat/lng
    return get_risk_map(lat, lng)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

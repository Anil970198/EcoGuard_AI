import io
import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
from pydantic import BaseModel
import random
from typing import List, Dict

# 1. SETUP MODEL
# Using ResNet50 for better accuracy than MobileNet
print("Loading ResNet50 model...")
weights = models.ResNet50_Weights.DEFAULT
model = models.resnet50(weights=weights)
model.eval()

# Image Preprocessing
preprocess = weights.transforms()

# Load ImageNet labels
with open("backend/imagenet_classes.txt", "r") as f:
    categories = [s.strip() for s in f.readlines()]

def classify_image(image_bytes: bytes) -> List[Dict]:
    """
    Takes raw image bytes, runs through ResNet50, returns top 3 predictions.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        batch = preprocess(img).unsqueeze(0)

        with torch.no_grad():
            prediction = model(batch)
            probabilities = F.softmax(prediction, dim=1)

        # Get top 3
        top3_prob, top3_catid = torch.topk(probabilities, 3)
        
        results = []
        for i in range(3):
            score = top3_prob[0][i].item()
            class_id = top3_catid[0][i].item()
            label = categories[class_id]
            results.append({"className": label, "probability": score})
            
        return results
    except Exception as e:
        print(f"Prediction Error: {e}")
        return []

# 2. RISK MODEL (Mocked for Demo, but Python-based)
class RiskPoint(BaseModel):
    lat: float
    lng: float
    riskScore: float
    reason: str

def get_risk_map(center_lat: float, center_lng: float) -> List[RiskPoint]:
    """
    Generates risk points using Python randomization (numpy/scipy could be used here for complex logic)
    """
    points = []
    for _ in range(25):
        # Gaussian distribution simulation
        lat = center_lat + (random.random() - 0.5) * 0.08
        lng = center_lng + (random.random() - 0.5) * 0.08
        
        # Simple heuristic: Further from center = lower risk (simulating urban vs rural)
        dist = ((lat - center_lat)**2 + (lng - center_lng)**2)**0.5
        risk = max(0.1, 1.0 - (dist * 10)) # Arbitrary formula
        
        # Add random noise
        risk = min(0.99, risk * random.uniform(0.8, 1.2))
        
        reason = "High Wildlife Activity" if risk > 0.7 else "Moderate Risk"
        
        points.append(RiskPoint(
            lat=lat, 
            lng=lng, 
            riskScore=risk, 
            reason=reason
        ))
    return points

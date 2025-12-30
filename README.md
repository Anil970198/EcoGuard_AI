# EcoGuard AI 🦌🛑

**EcoGuard AI** is a citizen science platform designed to reduce wildlife-vehicle collisions. It combines community reporting with AI-powered risk analysis to warn drivers of high-risk areas in real-time.

![EcoGuard AI Banner](https://via.placeholder.com/1200x600?text=EcoGuard+AI+Dashboard)

## 🚀 Features

-   **Interactive Risk Map**: Visualize high-risk zones based on a predictive model (Mock/Heuristic based).
-   **AI-Assisted Reporting**: Upload a photo of an animal, and our **ResNet50 AI (PyTorch)** will identify the species to speed up reporting.
-   **Live Alerts**: Real-time warning feed for drivers near hotspots.
-   **Modern Dashboard**: Clean, dark-mode UI built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend (User Interface)
-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, TypeScript)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Maps**: [React Leaflet](https://react-leaflet.js.org/) (OpenStreetMap)
-   **Icons**: Lucide React

### Backend (AI & API)
-   **Server**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
-   **AI Model**: [PyTorch](https://pytorch.org/) + TorchVision (ResNet50)
-   **Image Processing**: Pillow (PIL)

---

## 📦 Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   Python (3.8+)
-   Standard Python tools (`pip`, `venv`)

### 1. Clone the Repository
```bash
git clone https://github.com/Anil970198/EcoGuard_AI.git
cd EcoGuard_AI
```

### 2. Backend Setup
The backend handles image classification and risk data generation.

```bash
# Navigate to project root if not already there
# Create/Activate virtual environment (Optional but Recommended)
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Dependencies
pip install fastapi uvicorn torch torchvision pillow python-multipart

# Start the API Server
python3 backend/main.py
```
> The backend will run on `http://localhost:8000`.

### 3. Frontend Setup
The frontend provides the map and reporting interface.

```bash
# In a new terminal window
npm install

# Start Development Server
npm run dev
```
> The frontend will run on `http://localhost:3000`.

---

## 📱 Usage Guide

1.  **View Map**: Open the home page to see risk circles. Red = High Risk, Orange = Moderate.
2.  **Report Incident**:
    -   Click the **Report** button (bottom right).
    -   Upload an image of an animal.
    -   The AI will auto-detect the animal type (e.g., "Deer").
    -   Submit to add to the map (simulated).
3.  **Check Alerts**: Click **Alerts** in the top navigation to see text-based warnings.

## 🤖 How the AI Works

-   **Vision**: We use a pre-trained **ResNet50** model from TorchVision. It classifies uploaded images into one of 1000 ImageNet categories. We display the class and confidence score.
-   **Risk Model**: currently a heuristic simulation. It takes into account:
    -   Time of day (Dusk/Dawn = Higher Risk).
    -   Location (Proximity to "forests" - simulated).

## 📄 License

MIT License. Open source for wildlife conservation.

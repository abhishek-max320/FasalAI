from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io


app = FastAPI(
    title="FasalAI Backend",
    description="Crop Disease Detection API",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "FasalAI Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "FasalAI API"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Check file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    try:
        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        width, height = image.size

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to process the uploaded image."
        )

    # TEMPORARY RESPONSE
    # Later this will come from our actual AI model.
    return {
        "crop": "Rice",
        "disease": "Brown Spot Disease",
        "confidence": 94,
        "severity": "Moderate",

        "cause": (
            "Brown spot is commonly associated with fungal "
            "infection and can spread under humid field conditions."
        ),

        "organicTreatment": (
            "Remove highly affected leaves, maintain proper field "
            "sanitation and use recommended biological control methods."
        ),

        "chemicalTreatment": (
            "Use an approved crop fungicide according to local "
            "agricultural recommendations and the product label."
        ),

        "prevention": (
            "Maintain balanced nutrition, proper irrigation, field "
            "sanitation and regularly monitor the crop for early symptoms."
        ),

        "imageInfo": {
            "filename": file.filename,
            "width": width,
            "height": height,
        }
    }
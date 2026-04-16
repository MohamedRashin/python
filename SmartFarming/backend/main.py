import datetime
import string
from typing import Any, Dict, List
import joblib
import numpy as np
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Crop Recommendation API", version="1.0.0")
string
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class LocationInput(BaseModel):
    lat: float
    lon: float
    N: float
    P: float
    K: float
    ph: float


class ManualInput(BaseModel):
    N: float
    P: float
    K: float
    ph: float
    temperature: float
    humidity: float
    rainfall: float


class PredictionResponse(BaseModel):
    recommended_crop: str
    confidence: float
    top_crops: List[Dict[str, Any]]
    weather_data: Dict[str, float] = None


# Crop predictor class
class CropPredictor:
    def __init__(self):
        # Load trained model (ensure crop_model.pkl exists)
        try:
            self.model = joblib.load("crop_model.pkl")
        except FileNotFoundError:
            print("Warning: crop_model.pkl not found. Using mock predictions.")
            self.model = None

        # Crop classes
        self.crops = [
            "rice",
            "maize",
            "chickpea",
            "kidneybeans",
            "pigeonpeas",
            "mothbeans",
            "mungbean",
            "blackgram",
            "lentil",
            "pomegranate",
            "banana",
            "mango",
            "grapes",
            "watermelon",
            "muskmelon",
            "apple",
            "orange",
            "papaya",
            "coconut",
            "cotton",
            "jute",
            "coffee",
        ]

    def predict_crop_from_features(self, features):
        """Predict crop from feature array"""
        if self.model is None:
            # Mock prediction for demo
            import random

            recommended = random.choice(self.crops)
            confidence = random.uniform(0.6, 0.95)

            # Generate top 5 crops with probabilities
            selected_crops = random.sample(self.crops, 5)
            probabilities = sorted(
                [random.uniform(0.1, confidence) for _ in range(5)], reverse=True
            )
            probabilities[0] = (
                confidence  # Ensure recommended crop has highest probability
            )

            top_crops = [
                {"name": crop, "probability": prob}
                for crop, prob in zip(selected_crops, probabilities)
            ]
            return recommended, confidence, top_crops

        try:
            # Real prediction
            features_array = np.array([features])
            prediction = self.model.predict(features_array)[0]
            probabilities = self.model.predict_proba(features_array)[0]

            # Get recommended crop
            recommended_crop = self.crops[prediction]
            confidence = max(probabilities)

            # Get top 5 crops with probabilities
            top_indices = np.argsort(probabilities)[::-1][:5]
            top_crops = [
                {"name": self.crops[i], "probability": float(probabilities[i])}
                for i in top_indices
            ]

            return recommended_crop, float(confidence), top_crops

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# Initialize predictor
predictor = CropPredictor()


def get_weather_data(lat: float, lon: float) -> Dict[str, float]:
    """Fetch weather data from NASA POWER API"""
    try:
        # Date range calculations
        end_date = datetime.datetime.today()
        start_date_5d = end_date - datetime.timedelta(days=5)
        start_date_30d = end_date - datetime.timedelta(days=30)

        end_str_5d = end_date.strftime("%Y%m%d")
        start_str_30d = start_date_30d.strftime("%Y%m%d")

        # NASA POWER API endpoint
        url = (
            f"https://power.larc.nasa.gov/api/temporal/daily/point"
            f"?parameters=T2M,RH2M,PRECTOTCORR"
            f"&community=AG"
            f"&longitude={lon}&latitude={lat}"
            f"&start={start_str_30d}&end={end_str_5d}"
            f"&format=JSON"
        )

        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        if "properties" in data:
            daily_data = data["properties"]["parameter"]

            # Calculate averages for temperature and humidity (last 5 days)
            temps, humids = [], []
            for date in daily_data["T2M"]:
                date_obj = datetime.datetime.strptime(date, "%Y%m%d")
                if date_obj >= start_date_5d:
                    temp = daily_data["T2M"][date]
                    humidity = daily_data["RH2M"][date]
                    if temp != -999.0:
                        temps.append(temp)
                    if humidity != -999.0:
                        humids.append(humidity)

            # Calculate total rainfall (last 30 days)
            rains = [
                daily_data["PRECTOTCORR"][date]
                for date in daily_data["PRECTOTCORR"]
                if daily_data["PRECTOTCORR"][date] != -999.0
            ]

            avg_temp = round(np.mean(temps), 1) if temps else 25.0
            avg_humidity = round(np.mean(humids), 1) if humids else 70.0
            total_rainfall = round(sum(rains), 1) if rains else 150.0

            return {
                "temperature": avg_temp,
                "humidity": avg_humidity,
                "rainfall": total_rainfall,
            }
        else:
            raise Exception("Invalid response from weather API")

    except Exception as e:
        print(f"Weather API error: {str(e)}")
        # Return default values if API fails
        return {"temperature": 25.0, "humidity": 70.0, "rainfall": 150.0}


# API endpoints
@app.get("/")
async def root():
    return {"message": "Crop Recommendation API", "version": "1.0.0"}


@app.post("/predict/location", response_model=PredictionResponse)
async def predict_crop_by_location(input_data: LocationInput):
    """Predict crop based on location and soil parameters"""
    try:
        # Get weather data
        weather_data = get_weather_data(input_data.lat, input_data.lon)

        # Prepare features array [N, P, K, temperature, humidity, ph, rainfall]
        features = [
            input_data.N,
            input_data.P,
            input_data.K,
            weather_data["temperature"],
            weather_data["humidity"],
            input_data.ph,
            weather_data["rainfall"],
        ]

        # Get prediction
        recommended_crop, confidence, top_crops = predictor.predict_crop_from_features(
            features
        )

        return PredictionResponse(
            recommended_crop=recommended_crop,
            confidence=confidence,
            top_crops=top_crops,
            weather_data=weather_data,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict/manual", response_model=PredictionResponse)
async def predict_crop_manual(input_data: ManualInput):
    """Predict crop based on manual input parameters"""
    try:
        # Prepare features array [N, P, K, temperature, humidity, ph, rainfall]
        features = [
            input_data.N,
            input_data.P,
            input_data.K,
            input_data.temperature,
            input_data.humidity,
            input_data.ph,
            input_data.rainfall,
        ]

        # Get prediction
        recommended_crop, confidence, top_crops = predictor.predict_crop_from_features(
            features
        )

        return PredictionResponse(
            recommended_crop=recommended_crop,
            confidence=confidence,
            top_crops=top_crops,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/weather/{lat}/{lon}")
async def get_weather_info(lat: float, lon: float):
    """Get weather information for a specific location"""
    try:
        weather_data = get_weather_data(lat, lon)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/crops")
async def get_available_crops():
    """Get list of available crops"""
    return {"crops": predictor.crops}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

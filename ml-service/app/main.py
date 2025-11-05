from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

app = FastAPI()

class TransactionData(BaseModel):
    data: List[dict]

@app.get('/')
async def health():
    return {'status': 'ok'}

@app.post('/predict')
async def predict(payload: TransactionData):
    """
    Simple linear regression forecast.
    Takes transaction history and forecasts next 6 months.
    """
    transactions = payload.data
    
    if len(transactions) < 3:
        return {'error': 'Insufficient data', 'forecast': []}
    
    # Extract amounts and convert dates to numeric values
    amounts = [float(tx['amount']) for tx in transactions]
    dates = [datetime.fromisoformat(tx['date'].replace('Z', '+00:00')) for tx in transactions]
    
    # Convert dates to days since first transaction
    X = np.array([(d - dates[0]).days for d in dates]).reshape(-1, 1)
    y = np.array(amounts)
    
    # Train simple linear regression
    model = LinearRegression()
    model.fit(X, y)
    
    # Forecast next 6 months
    last_date = dates[-1]
    last_day = (dates[-1] - dates[0]).days
    
    forecast = []
    for i in range(1, 7):
        future_day = last_day + (30 * i)  # 30 days per month
        predicted_value = model.predict([[future_day]])[0]
        future_date = last_date + timedelta(days=30*i)
        
        forecast.append({
            'date': future_date.strftime('%Y-%m-%d'),
            'value': float(predicted_value)
        })
    
    return {'forecast': forecast}
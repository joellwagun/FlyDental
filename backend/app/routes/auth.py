# backend/app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your_secret_key"  # move this to env variables for production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

class LoginRequest(BaseModel):
    email: str
    password: str

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Ensure role is lowercase and trimmed
    user_role = user.role.strip().lower() if user.role else "user"
    
    token = create_access_token({
        "sub": user.email,
        "role": user_role,  # Use normalized role
        "user_id": user.id,
    })

    return {
        "access_token": token,
        "user_id": user.id,
        "email": user.email,
        "role": user_role,  # Return normalized role
        "clinic_id": getattr(user, "clinic_id", None)
    }
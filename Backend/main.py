from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str

@app.post("/login")
def login(data: LoginRequest):
    print(f"Received email: '{data.email}'")
    print(f"Received password: '{data.password}'")
    print(f"Received role: '{data.role}'")

    # User login
    if data.email == "user@example.com" and data.password == "user123" and data.role == "user":
        return {
            "message": "User login successful",
            "redirect": "/user-dashboard",
            "data": {
                "email": data.email,
                "role": data.role
            }
        }

    # Clinic login
    if data.email == "clinic@example.com" and data.password == "clinic123" and data.role == "clinic":
        return {
            "message": "Clinic login successful",
            "redirect": "/clinic-dashboard",
            "data": {
                "email": data.email,
                "role": data.role
            }
        }

    # If login fails
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/login-get")
def login_get(email: EmailStr, password: str, role: str):
    # Simulate login logic
    if email == "user@example.com" and password == "user123" and role == "user":
        return {"message": "User login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")



from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import timedelta, date
import random
import os

import models, schemas, crud, auth, database
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "healthy", "message": "Serenitea API is running successfully!"}

# CORS setup - reads FRONTEND_URL from environment for deployment
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
frontend_url = os.environ.get("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except auth.JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/questions", response_model=List[schemas.Question])
def read_questions(db: Session = Depends(get_db)):
    # Define the 10 specific questions for the day
    questions = [
        {"id": 1, "text": "How stressful was your day overall?", "category": "General", "options": ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]},
        {"id": 2, "text": "Were there any moments where you felt overwhelmed or anxious?", "category": "Emotion", "options": ["Never", "Rarely", "Sometimes", "Often", "Constantly"]},
        {"id": 3, "text": "Did you take enough time for self-care or relaxation today?", "category": "Self-Care", "options": ["Plenty", "Enough", "A little", "Barely any", "None at all"]},
        {"id": 4, "text": "Are you satisfied with what you accomplished today?", "category": "Productivity", "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]},
        {"id": 5, "text": "How is your physical energy level after today's activities?", "category": "Physical", "options": ["Very High", "High", "Moderate", "Low", "Exhausted"]},
        {"id": 6, "text": "How well did you manage your work-life balance today?", "category": "Balance", "options": ["Excellent", "Good", "Average", "Poor", "Terrible"]},
        {"id": 7, "text": "Did any specific interaction with someone affect your mood?", "category": "Social", "options": ["Positively", "Slightly positively", "Neutral", "Slightly negatively", "Negatively"]},
        {"id": 8, "text": "How calm and centered do you feel at this moment?", "category": "Mindfulness", "options": ["Very calm", "Calm", "Neutral", "Anxious", "Very Anxious"]},
        {"id": 9, "text": "Did you face any unexpected challenges or setbacks today?", "category": "Challenges", "options": ["None", "A minor one", "A few small ones", "A major one", "Multiple major ones"]},
        {"id": 10, "text": "Please describe any specific details or incidents that happened today (this helps us track your stress patterns).", "category": "Incident", "options": []}
    ]
    return questions

@app.post("/assessments", response_model=schemas.Assessment)
def create_user_assessment(
    assessment: schemas.AssessmentCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_assessment(db=db, assessment=assessment, user_id=current_user.id)

@app.get("/assessments", response_model=List[schemas.Assessment])
def read_user_assessments(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_assessments(db, user_id=current_user.id)

@app.get("/user/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.post("/journals", response_model=schemas.JournalEntry)
def create_journal(
    journal: schemas.JournalEntryCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_journal_entry(db=db, journal=journal, user_id=current_user.id)

@app.get("/journals", response_model=List[schemas.JournalEntry])
def read_journals(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_journal_entries(db, user_id=current_user.id)

# Serve React frontend (must be LAST so API routes take priority)
import pathlib
frontend_dist = pathlib.Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    from fastapi.staticfiles import StaticFiles
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="static")

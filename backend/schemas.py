from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class UserBase(BaseModel):
    username: str
    occupation: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AssessmentBase(BaseModel):
    score_percentage: float
    suggestions: str
    incident: Optional[str] = None

class AssessmentCreate(AssessmentBase):
    pass

class Assessment(AssessmentBase):
    id: int
    user_id: int
    date: date

    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    text: str
    category: str
    options: Optional[List[str]] = None

class Question(QuestionBase):
    id: int

    class Config:
        from_attributes = True

class JournalEntryBase(BaseModel):
    title: str
    content: str

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntry(JournalEntryBase):
    id: int
    user_id: int
    date: date

    class Config:
        from_attributes = True

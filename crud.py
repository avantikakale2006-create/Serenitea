from sqlalchemy.orm import Session
import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password, occupation=user.occupation)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_assessment(db: Session, assessment: schemas.AssessmentCreate, user_id: int):
    db_assessment = models.Assessment(**assessment.dict(), user_id=user_id)
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

def get_assessments(db: Session, user_id: int):
    return db.query(models.Assessment).filter(models.Assessment.user_id == user_id).all()

def get_questions(db: Session):
    return db.query(models.Question).all()

def create_question(db: Session, question: schemas.QuestionBase):
    db_question = models.Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def create_journal_entry(db: Session, journal: schemas.JournalEntryCreate, user_id: int):
    db_journal = models.JournalEntry(**journal.dict(), user_id=user_id)
    db.add(db_journal)
    db.commit()
    db.refresh(db_journal)
    return db_journal

def get_journal_entries(db: Session, user_id: int):
    return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id).order_by(models.JournalEntry.date.desc()).all()

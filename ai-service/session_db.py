# backend/session_db.py
from sqlalchemy import create_engine, Column, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

# SQLite database file
engine = create_engine("sqlite:///sessions.db", connect_args={"check_same_thread": False})
DBSession = sessionmaker(bind=engine)

class Session(Base):
    __tablename__ = "sessions"
    email = Column(String, primary_key=True)
    name = Column(String)
    role = Column(String)
    is_active = Column(Boolean, default=True)

# Create table if not exists
Base.metadata.create_all(engine)
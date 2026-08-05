from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database.database import Base

class ReviewHistory(Base):
    __tablename__ = "review_history"

    id = Column(Integer, primary_key=True, index=True)
    repository = Column(String)
    score = Column(Integer)
    bugs = Column(Text)
    security = Column(Text)
    performance = Column(Text)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
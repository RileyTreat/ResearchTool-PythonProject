from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func

class Answer(db.Model):
    __tablename__ = add_prefix_for_prod("answers")

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    artifact_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artifacts.id")), nullable=False)
    answer = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "question_id": self.question_id,
            "artifact_id": self.artifact_id,
            "answer": self.answer,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

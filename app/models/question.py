from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func

class Question(db.Model):
    __tablename__ = add_prefix_for_prod("questions")

    id = db.Column(db.Integer, primary_key=True)
    artifact_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artifacts.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "artifact_id": self.artifact_id,
            "user_id": self.user_id,
            "question": self.question,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

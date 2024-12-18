from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSON

class Artifact(db.Model):
    __tablename__ = add_prefix_for_prod("artifacts")

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    referenceDate = db.Column(JSON, nullable=True)
    referencePerson = db.Column(JSON, nullable=True)
    creator = db.Column(JSON, nullable=True)
    place = db.Column(JSON, nullable=True)
    types = db.Column(JSON, nullable=True)
    subject = db.Column(JSON, nullable=True)
    archiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)  
    material = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    images = db.relationship('ArtifactImage', backref='artifact', cascade="all, delete-orphan")
    questions = db.relationship('Question', backref='artifact', cascade="all, delete-orphan")
    answers = db.relationship('Answer', backref='artifact', cascade="all, delete-orphan")
    archiver = db.relationship('User', backref='archived_artifacts')  

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "referenceDate": self.referenceDate,
            "referencePerson": self.referencePerson,
            "creator": self.creator,
            "place": self.place,
            "types": self.types,
            "subject": self.subject,
            "archiver_id": self.archiver_id,
            "archiver": self.archiver.username if self.archiver else None,
            "material": self.material,
            "images": [image.to_dict() for image in self.images],
            "questions": [question.to_dict() for question in self.questions],
            "answers": [answer.to_dict() for answer in self.answers],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

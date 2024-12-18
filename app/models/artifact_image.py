from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func

class ArtifactImage(db.Model):
    __tablename__ = add_prefix_for_prod("artifact_images")

    id = db.Column(db.Integer, primary_key=True)
    artifact_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artifacts.id")), nullable=False)
    url = db.Column(db.String(500), nullable=False)  
    preview = db.Column(db.Boolean, default=False)  
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "artifact_id": self.artifact_id,
            "url": self.url,
            "preview": self.preview,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

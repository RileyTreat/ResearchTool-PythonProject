from app.models import db, ArtifactImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_artifact_images():
    image1 = ArtifactImage(
        artifact_id=1,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_cover_1_dndymp.jpg",
        preview=True
    )
    image2 = ArtifactImage(
        artifact_id=2,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_index1_lqlmpk.jpg",
        preview=True
    )
    image3 = ArtifactImage(
        artifact_id=3,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p001_imaqoo.jpg",
        preview=True
    )
    image4 = ArtifactImage(
        artifact_id=4,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p007_w7zpwa.jpg",
        preview=True
    )
    image5 = ArtifactImage(
        artifact_id=5,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p008_Khan_eftqml.jpg",
        preview=True
    )
    image6 = ArtifactImage(
        artifact_id=6,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p065_Khan_q4p3mc.jpg",
        preview=True
    )
    image7 = ArtifactImage(
        artifact_id=7,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p098_mwhnsa.jpg",
        preview=True
    )
    image8 = ArtifactImage(
        artifact_id=8,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p100_kydm0e.jpg",
        preview=True
    )
    image9 = ArtifactImage(
        artifact_id=9,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p264_mf2x0k.jpg",
        preview=True
    )
    image10 = ArtifactImage(
        artifact_id=10,
        url="https://res.cloudinary.com/do1i2vmgg/image/upload/TZ_TTG_1920_p202_glohia.jpg",
        preview=True
    )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.commit()

def undo_artifact_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artifact_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artifact_images"))
        
    db.session.commit()

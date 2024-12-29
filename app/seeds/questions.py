from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text

def seed_questions():
    question1 = Question(
        artifact_id=1,
        user_id=2,  # Assuming 'marnie' is asking
        question="What was the purpose of this publication?"
    )
    question2 = Question(
        artifact_id=1,
        user_id=3,  # Assuming 'bobbie' is asking
        question="Does the publication mention any notable events?"
    )
    question3 = Question(
        artifact_id=2,
        user_id=1,  # Assuming 'Demo' is asking
        question="What kind of appointments are listed in this index?"
    )
    question4 = Question(
        artifact_id=2,
        user_id=3,  # Assuming 'bobbie' is asking
        question="Are there any notable names mentioned in this index?"
    )
    question5 = Question(
        artifact_id=3,
        user_id=1,  # Assuming 'Demo' is asking
        question="What was the purpose of this royal proclamation?"
    )
    question6 = Question(
        artifact_id=3,
        user_id=2,  # Assuming 'marnie' is asking
        question="What roles were assigned to Sir Horace Archer Byatt and Alfred Claud Hollis?"
    )
    question7 = Question(
        artifact_id=4,
        user_id=2,  # Assuming 'marnie' is asking
        question="What were the key regulations established under this martial law?"
    )
    question8 = Question(
        artifact_id=4,
        user_id=3,  # Assuming 'bobbie' is asking
        question="Why was martial law declared in German East Africa?"
    )
    question9 = Question(
        artifact_id=5,
        user_id=3,  # Assuming 'bobbie' is asking
        question="What were the requirements for registering a birth under this proclamation?"
    )
    question10 = Question(
        artifact_id=5,
        user_id=1,  # Assuming 'Demo' is asking
        question="What penalties were imposed for failing to register a death?"
    )
    question11 = Question(
        artifact_id=6,
        user_id=1,  # Assuming 'Demo' is asking
        question="What was required of those with claims against Amir Khan's estate?"
    )
    question12 = Question(
        artifact_id=6,
        user_id=2,  # Assuming 'marnie' is asking
        question="Who was responsible for managing Amir Khan's estate?"
    )
    question13 = Question(
        artifact_id=7,
        user_id=2,  # Assuming 'marnie' is asking
        question="What properties are listed in this notice?"
    )
    question14 = Question(
        artifact_id=7,
        user_id=3,  # Assuming 'bobbie' is asking
        question="What are the requirements for liquor license applications in this notice?"
    )
    question15 = Question(
        artifact_id=8,
        user_id=1,  # Assuming 'Demo' is asking
        question="What were the new appointments listed in this record?"
    )
    question16 = Question(
        artifact_id=8,
        user_id=2,  # Assuming 'marnie' is asking
        question="Who was transferred from Dar-es-Salaam to Tabora, and what was their role?"
    )
    question17 = Question(
        artifact_id=9,
        user_id=1,  # Assuming 'Demo' is asking
        question="What provisions are included in this ordinance for mining development?"
    )
    question18 = Question(
        artifact_id=9,
        user_id=3,  # Assuming 'bobbie' is asking
        question="What are the definitions of 'claims' and 'minerals' as outlined in the ordinance?"
    )
    question19 = Question(
        artifact_id=10,
        user_id=2,  # Assuming 'marnie' is asking
        question="What were the notable government employee departures listed in this document?"
    )
    question20 = Question(
        artifact_id=10,
        user_id=3,  # Assuming 'bobbie' is asking
        question="What were the subscription rates for the Official Gazette?"
    )


    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()

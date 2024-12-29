from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answers():
    answer1 = Answer(
        question_id=1,
        artifact_id=1,
        answer="The publication served as a colonial administrative document."
    )
    answer2 = Answer(
        question_id=2,
        artifact_id=1,
        answer="Yes, it mentions several decrees and government orders."
    )
    answer3 = Answer(
        question_id=3,
        artifact_id=2,
        answer="The index lists administrative appointments such as district political officers, postmasters, engineers, and other colonial roles."
    )
    answer4 = Answer(
        question_id=4,
        artifact_id=2,
        answer="Yes, the index mentions notable colonial officers like H.H. Allsopp and R.S.B.M. Hicks-Mahoney."
    )
    answer5 = Answer(
        question_id=5,
        artifact_id=3,
        answer="The proclamation established the administration for the Occupied Territory of German East Africa and outlined the roles of the appointed administrators."
    )
    answer6 = Answer(
        question_id=6,
        artifact_id=3,
        answer="Sir Horace Archer Byatt was appointed Administrator of the territory, while Alfred Claud Hollis was designated as the acting Administrator in case of Byatt's absence."
    )
    answer7 = Answer(
        question_id=7,
        artifact_id=4,
        answer="The proclamation established regulations prohibiting the import and export of dutiable goods except through authorized customs stations and restricted trade in manufactured goods and raw materials."
    )
    answer8 = Answer(
        question_id=8,
        artifact_id=4,
        answer="Martial law was declared to ensure control over German East Africa during its occupation by British forces, allowing for military governance and enforcement of trade regulations."
    )
    answer9 = Answer(
        question_id=9,
        artifact_id=5,
        answer="The birth of every child was required to be registered, with details such as the name, sex, residence, and occupation of the parents. For illegitimate births, the father’s name could only be recorded with his request or verification."
    )
    answer10 = Answer(
        question_id=10,
        artifact_id=5,
        answer="Failure to register a death within one month of occurrence was deemed an offense under Martial Law Regulations, punishable by penalties determined by the Administrator."
    )
    answer11 = Answer(
        question_id=11,
        artifact_id=6,
        answer="All persons with claims against Amir Khan's estate were required to lodge and prove their claims before the executor and committee by December 1, 1919."
    )
    answer12 = Answer(
        question_id=12,
        artifact_id=6,
        answer="Hukum Singh served as the executor, and Sheriff Mohamed Shah and Chanan Singh were members of the committee responsible for managing Amir Khan's estate."
    )
    answer13 = Answer(
        question_id=13,
        artifact_id=7,
        answer="The notice lists three properties located in Dar-es-Salaam, with descriptions including land size, ownership, and associated restrictions."
    )
    answer14 = Answer(
        question_id=14,
        artifact_id=7,
        answer="Applicants for liquor licenses were required to submit applications by March 13, 1920, and attend the District Political Office for a hearing."
    )
    answer15 = Answer(
        question_id=15,
        artifact_id=8,
        answer="New appointments included R.V. Allin as Assistant Engineer in Kidete, R.H. Furness as Magistrate in Dar-es-Salaam, and several others in railway, police, and administrative roles."
    )
    answer16 = Answer(
        question_id=16,
        artifact_id=8,
        answer="W. Butler-Lloyd, a Magistrate, was transferred from Dar-es-Salaam to Tabora with effect from March 13, 1920."
    )
    answer17 = Answer(
        question_id=17,
        artifact_id=9,
        answer="The ordinance provides definitions for terms like 'alluvial,' 'claims,' and 'minerals,' and outlines the legal framework for mining development, including land claims and excavation rules."
    )
    answer18 = Answer(
        question_id=18,
        artifact_id=9,
        answer="'Claims' refer to portions of land lawfully taken for mining purposes, while 'minerals' include all valuable metals and other substances such as building materials, water, and oils defined for mining operations."
    )
    answer19 = Answer(
        question_id=19,
        artifact_id=10,
        answer="The departures included A.O.E. Bradshaw as Assistant Inspector of Police from Langenburg, H.S. Hill as Supervisor of Customs from Mwanza, and others in various government roles."
    )
    answer20 = Answer(
        question_id=20,
        artifact_id=10,
        answer="Subscription rates for the Official Gazette were Rs 12 for one year, Rs 6.50 for six months, and Rs 0.50 for a single copy."
    )
            


    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.add(answer5)
    db.session.add(answer6)
    db.session.add(answer7)
    db.session.add(answer8)
    db.session.add(answer9)
    db.session.add(answer10)
    db.session.add(answer11)
    db.session.add(answer12)
    db.session.add(answer13)
    db.session.add(answer14)
    db.session.add(answer15)
    db.session.add(answer16)
    db.session.add(answer17)
    db.session.add(answer18)
    db.session.add(answer19)
    db.session.add(answer20)
    db.session.commit()

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))
        
    db.session.commit()

from app.models import db, Artifact, environment, SCHEMA
from sqlalchemy.sql import text

def seed_artifacts():
    artifact1 = Artifact(
        title="Tanganyika Territory Gazette",
        description="A government publication from Tanganyika Territory, 1917–1920.",
        referenceDate="1917-1920",
        referencePerson="Tanganyika Government",
        creator="Unknown",
        place="East Africa",
        types="Publication",
        subject="Colonial Administration",
        archiver_id=1,  
        material="Paper"
    )
    artifact2 = Artifact(
        title="Tanganyika Territory Gazette Index",
        description="Index to the Official Gazette, Volume I, covering administrative records and appointments in Tanganyika Territory from June 24, 1919, to December 29, 1920.",
        referenceDate=["June 24, 1919", "December 29, 1920"],
        referencePerson=["H.H. Allsopp", "R.S.B.M. Hicks-Mahoney", "Tanganyika Government", "A.D. Ayre", "E.C. Banks"],
        creator="Unknown",
        place="East Africa",
        types="Index",
        subject="Colonial Administration and Appointments",
        archiver_id=2,  # Assuming this is archived by 'marnie'
        material="Paper"
    )
    artifact3 = Artifact(
        title="Occupied Territory of German East Africa Official Gazette",
        description="The first volume of the Official Gazette for the Occupied Territory of German East Africa, dated June 24, 1919. This document includes a royal proclamation and administrative appointments.",
        referenceDate=["June 24, 1919", "January 31, 1919"],
        referencePerson=["George V", "Horace Archer Byatt", "Alfred Claud Hollis", "S.S. Davis", "Milner"],
        creator=["British Administration of German East Africa"],
        place=["Dar-es-Salaam", "St. James' Court", "German East Africa"],
        types=["Gazette", "Proclamation"],
        subject=["Colonial Administration", "Territorial Governance"],
        archiver_id=3,  # Assuming 'bobbie' archived this artifact
        material="Paper"
    )
    artifact4 = Artifact(
        title="Proclamation Under Martial Law",
        description="A proclamation establishing martial law throughout German East Africa, issued by Lieutenant General J.C. Smuts on March 12, 1916, and re-published on June 24, 1919.",
        referenceDate=["March 12, 1916", "June 24, 1919"],
        referencePerson=["J.C. Smuts", "S.S. Davis"],
        creator=["East African Forces", "British Administration"],
        place=["German East Africa", "Dar-es-Salaam"],
        types=["Proclamation", "Legal Document"],
        subject=["Martial Law", "Colonial Administration", "Trade Regulation"],
        archiver_id=1,  # Assuming 'Demo' archived this artifact
        material="Paper"
    )
    artifact5 = Artifact(
        title="Proclamation No. 15 of 1917 (Civil Area) - Registration of Births and Deaths",
        description="A proclamation under martial law outlining regulations for the registration of births and deaths in the civil areas of German East Africa.",
        referenceDate=["August 25, 1917", "December 22, 1916"],
        referencePerson=["H.A. Byatt"],
        creator=["Administrator of German East Africa"],
        place=["German East Africa", "Withesland"],
        types=["Proclamation", "Legal Document"],
        subject=["Martial Law", "Civil Administration", "Birth and Death Registration"],
        archiver_id=2,  # Assuming 'marnie' archived this artifact
        material="Paper"
    )
    artifact6 = Artifact(
        title="General Notice No. 5 - Re Amir Khan, Deceased",
        description="A notice regarding claims and debts against the estate of Amir Khan, who passed away in Kampala, Uganda, on July 24, 1919.",
        referenceDate=["July 24, 1919", "December 1, 1919", "September 13, 1919"],
        referencePerson=["Amir Khan", "Hukum Singh", "Sheriff Mohamed Shah", "Chanan Singh", "Chas. R. Cadiz"],
        creator=["District Political Officer, Mwanza"],
        place=["Kampala, Uganda", "Mwanza"],
        types=["Notice", "Legal Document"],
        subject=["Estate Claims", "Legal Proceedings", "Colonial Administration"],
        archiver_id=3,  # Assuming 'bobbie' archived this artifact
        material="Paper"
    )
    artifact7 = Artifact(
        title="Official Gazette Notices and Property Listings",
        description="Various notices, including property listings, liquor license applications, and estate claims, published in the Official Gazette on March 8, 1920.",
        referenceDate=["March 1, 1920", "March 4, 1920", "March 8, 1920", "February 16, 1920", "March 31, 1920"],
        referencePerson=[
            "M.A. West", 
            "J.J. Vernon Wilson", 
            "John Joseph Gibson", 
            "Otto Koch", 
            "Julius D.T. Schaefer", 
            "Walter Dolberlein"
        ],
        creator=["Government Printer, Dar-es-Salaam"],
        place=["Dar-es-Salaam", "Morgoro"],
        types=["Notice", "Property Listings", "Legal Document"],
        subject=[
            "Estate Claims", 
            "Property Transactions", 
            "Licensing", 
            "Government Auctions"
        ],
        archiver_id=1,  # Assuming 'Demo' archived this artifact
        material="Paper"
    )
    artifact8 = Artifact(
        title="Official Gazette - Arrivals, Departures, and Transfers",
        description="A record of personnel appointments, terminations, transfers, and general notices published in the Official Gazette on March 15, 1920.",
        referenceDate=["March 15, 1920", "January 23, 1920", "March 8, 1920", "March 13, 1920"],
        referencePerson=[
            "R.V. Allin", "R.H. Furness", "H.G.E. Harris", "J.H. Paslen", 
            "W.H.E. Scupham", "G.C. Van Feden", "S.A. Aris", "E. Clark", 
            "H.F. Evans", "F.C. Logan", "E. Reid", "E.N. Howlett", "W. Butler-Lloyd"
        ],
        creator=["East African Railways", "Public Works Department", "Colonial Administration"],
        place=["Kidete", "Dar-es-Salaam", "Iringa", "Dodoma", "Lindi", "Tabora"],
        types=["Personnel Record", "Official Notice"],
        subject=[
            "Personnel Transfers", 
            "Government Appointments", 
            "Resignations", 
            "Colonial Administration"
        ],
        archiver_id=3,  # Assuming 'bobbie' archived this artifact
        material="Paper"
    )
    artifact9 = Artifact(
        title="Tanganyika Territory - Mining Ordinance No. 11 of 1920",
        description="An ordinance enacted by the Governor of Tanganyika Territory to establish provisions for the development of mines and minerals.",
        referenceDate=["December 15, 1920"],
        referencePerson=["H.A. Byatt"],
        creator=["Governor of Tanganyika Territory"],
        place=["Dar-es-Salaam", "Mombo"],
        types=["Ordinance", "Legal Document"],
        subject=[
            "Mines and Minerals Development", 
            "Colonial Governance",
            "Legal Definitions and Provisions"
        ],
        archiver_id=2,  # Assuming 'marnie' archived this artifact
        material="Paper"
    )
    artifact10 = Artifact(
        title="Official Gazette - Departures and Subscription Rates",
        description="A record of government personnel departures and subscription rates for the Official Gazette as of September 30, 1920.",
        referenceDate=["September 17, 1920", "September 23, 1920", "September 27, 1920", "September 30, 1920"],
        referencePerson=[
            "A.O.E. Bradshaw", 
            "R.R. Dalling", 
            "H.S. Hill", 
            "J.G. Hoatson", 
            "E.A. Sadler", 
            "B.L. Waizeneker"
        ],
        creator=["Government Printer, Dar-es-Salaam"],
        place=["Langenburg", "Mwanza", "Dar-es-Salaam", "Tabora", "Morogoro"],
        types=["Personnel Record", "Official Notice"],
        subject=[
            "Government Employee Departures",
            "Subscription Information",
            "Colonial Administration"
        ],
        archiver_id=1,  # Assuming 'Demo' archived this artifact
        material="Paper"
    )
    

    db.session.add(artifact1)
    db.session.add(artifact2)
    db.session.add(artifact3)
    db.session.add(artifact4)
    db.session.add(artifact5)
    db.session.add(artifact6)
    db.session.add(artifact7)
    db.session.add(artifact8)
    db.session.add(artifact9)
    db.session.add(artifact10)
    db.session.commit()

def undo_artifacts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artifacts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artifacts"))
        
    db.session.commit()

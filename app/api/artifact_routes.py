from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Artifact
from sqlalchemy.dialects.postgresql import JSON

artifact_routes = Blueprint('artifacts', __name__)

# GET all artifacts
@artifact_routes.route('/', methods=['GET'])
def get_artifacts():
    artifacts = Artifact.query.all()
    return jsonify([artifact.to_dict() for artifact in artifacts]), 200

# GET a single artifact by id
@artifact_routes.route('/<int:id>', methods=['GET'])
def get_artifact(id):
    artifact = Artifact.query.get(id)
    if not artifact:
        return {"error": "Artifact not found"}, 404
    return jsonify(artifact.to_dict()), 200

# POST - Create a new artifact
@artifact_routes.route('/', methods=['POST'])
@login_required
def create_artifact():
    data = request.get_json()
    artifact = Artifact(
        title=data['title'],
        description=data.get('description'),
        referenceDate=data.get('referenceDate'),  
        referencePerson=data.get('referencePerson'),  
        creator=data.get('creator'),  
        place=data.get('place'),  
        types=data.get('types'),  
        subject=data.get('subject'),  
        material=data.get('material'),
        archiver_id=current_user.id
    )
    db.session.add(artifact)
    db.session.commit()
    return jsonify(artifact.to_dict()), 201

# PUT - Update an artifact
@artifact_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_artifact(id):
    artifact = Artifact.query.get(id)
    if not artifact or artifact.archiver_id != current_user.id:
        return {"error": "Unauthorized or artifact not found"}, 403
    
    data = request.get_json()

    artifact.title = data.get('title', artifact.title)
    artifact.description = data.get('description', artifact.description)
    artifact.referenceDate = data.get('referenceDate', artifact.referenceDate)
    artifact.referencePerson = data.get('referencePerson', artifact.referencePerson)
    artifact.creator = data.get('creator', artifact.creator)
    artifact.place = data.get('place', artifact.place)
    artifact.types = data.get('types', artifact.types)
    artifact.subject = data.get('subject', artifact.subject)
    artifact.material = data.get('material', artifact.material)

    db.session.commit()
    return jsonify(artifact.to_dict()), 200

# DELETE - Delete an artifact
@artifact_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_artifact(id):
    artifact = Artifact.query.get(id)
    if not artifact or artifact.archiver_id != current_user.id:
        return {"error": "Unauthorized or artifact not found"}, 403
    db.session.delete(artifact)
    db.session.commit()
    return {"message": "Artifact deleted successfully"}, 200

# GET all artifacts owned by the current user
@artifact_routes.route('/current', methods=['GET'])
@login_required
def get_user_artifacts():
    artifacts = Artifact.query.filter_by(archiver_id=current_user.id).all()
    return jsonify([artifact.to_dict() for artifact in artifacts]), 200

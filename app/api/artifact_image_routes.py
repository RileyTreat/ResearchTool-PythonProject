from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, ArtifactImage, Artifact

artifact_image_routes = Blueprint('artifact_images', __name__)

# GET all artifact images for a specific artifact
@artifact_image_routes.route('/artifacts/<int:artifact_id>/images', methods=['GET'])
def get_artifact_images(artifact_id):
    """Get all images for a specific artifact"""
    images = ArtifactImage.query.filter_by(artifact_id=artifact_id).all()
    return jsonify([image.to_dict() for image in images]), 200

# POST a new image for an artifact
@artifact_image_routes.route('/artifacts/<int:artifact_id>/images', methods=['POST'])
@login_required
def post_artifact_image(artifact_id):
    """Post a new image for an artifact"""
    artifact = Artifact.query.get(artifact_id)

    if not artifact:
        return jsonify({"error": "Artifact not found"}), 404

    if artifact.archiver_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_image = ArtifactImage(
        artifact_id=artifact_id,
        url=data.get('url'),
        preview=data.get('preview', False)
    )

    db.session.add(new_image)
    db.session.commit()
    return jsonify(new_image.to_dict()), 201

# PUT update an artifact image (owner only)
@artifact_image_routes.route('/artifact-images/<int:image_id>', methods=['PUT'])
@login_required
def update_artifact_image(image_id):
    """Update an artifact image (owner only)"""
    image = ArtifactImage.query.get(image_id)

    if not image:
        return jsonify({"error": "Image not found"}), 404

    artifact = Artifact.query.get(image.artifact_id)
    if not artifact or artifact.archiver_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    if 'url' in data:
        image.url = data['url']
    if 'preview' in data:
        image.preview = data['preview']

    db.session.commit()
    return jsonify(image.to_dict()), 200

# DELETE an artifact image (owner only)
@artifact_image_routes.route('/artifact-images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_artifact_image(image_id):
    """Delete an artifact image (owner only)"""
    image = ArtifactImage.query.get(image_id)

    if not image:
        return jsonify({"error": "Image not found"}), 404

    artifact = Artifact.query.get(image.artifact_id)
    if not artifact or artifact.archiver_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(image)
    db.session.commit()
    return jsonify({"message": "Image deleted successfully"}), 200

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Question, Artifact

question_routes = Blueprint('questions', __name__)

# GET all questions for a specific artifact
@question_routes.route('/artifacts/<int:artifact_id>/questions', methods=['GET'])
def get_questions(artifact_id):
    """Get all questions for a specific artifact"""
    questions = Question.query.filter_by(artifact_id=artifact_id).all()
    return jsonify([question.to_dict() for question in questions]), 200

#GET all questions by the current logged in user
@question_routes.route('/current', methods=['GET'])
@login_required
def get_user_questions():
    """
    Get all questions owned by the current logged-in user.
    """
    user_id = current_user.id
    questions = Question.query.filter_by(user_id=user_id).all()

    if not questions:
        return jsonify({'message': 'No questions found for the current user'}), 404

    return jsonify([question.to_dict() for question in questions]), 200

# POST a new question
@question_routes.route('/artifacts/<int:artifact_id>/questions', methods=['POST'])
@login_required
def post_question(artifact_id):
    """Post a new question for an artifact"""
    artifact = Artifact.query.get(artifact_id)
    if not artifact:
        return jsonify({"error": "Artifact not found"}), 404
    
    data = request.get_json()
    new_question = Question(
        artifact_id=artifact_id,
        user_id=current_user.id,
        question=data.get('question')
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify(new_question.to_dict()), 201

# PUT update a question (owner only)
@question_routes.route('/questions/<int:question_id>', methods=['PUT'])
@login_required
def update_question(question_id):
    """Update a question (owner only)"""
    question = Question.query.get(question_id)

    if not question:
        return jsonify({"error": "Question not found"}), 404
    if question.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    question.question = data.get('question', question.question)
    db.session.commit()
    return jsonify(question.to_dict()), 200

# DELETE a question (owner only)
@question_routes.route('/questions/<int:question_id>', methods=['DELETE'])
@login_required
def delete_question(question_id):
    """Delete a question (owner only)"""
    question = Question.query.get(question_id)

    if not question:
        return jsonify({"error": "Question not found"}), 404
    if question.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(question)
    db.session.commit()
    return jsonify({"message": "Question deleted successfully"}), 200

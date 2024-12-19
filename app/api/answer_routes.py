from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Answer, Question

answer_routes = Blueprint('answers', __name__)

# GET all answers for a specific question
@answer_routes.route('/questions/<int:question_id>/answers', methods=['GET'])
def get_answers(question_id):
    """Get all answers for a specific question"""
    answers = Answer.query.filter_by(question_id=question_id).all()
    return jsonify([answer.to_dict() for answer in answers]), 200

# POST a new answer
@answer_routes.route('/questions/<int:question_id>/answers', methods=['POST'])
@login_required
def post_answer(question_id):
    """Post a new answer for a question"""
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404
    
    data = request.get_json()
    new_answer = Answer(
        question_id=question_id,
        artifact_id=question.artifact_id,
        answer=data.get('answer')
    )
    db.session.add(new_answer)
    db.session.commit()
    return jsonify(new_answer.to_dict()), 201

# PUT update an answer (owner only)
@answer_routes.route('/answers/<int:answer_id>', methods=['PUT'])
@login_required
def update_answer(answer_id):
    """Update an answer (owner only)"""
    answer = Answer.query.get(answer_id)

    if not answer:
        return jsonify({"error": "Answer not found"}), 404
    if answer.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    answer.answer = data.get('answer', answer.answer)
    db.session.commit()
    return jsonify(answer.to_dict()), 200

# DELETE an answer (owner only)
@answer_routes.route('/answers/<int:answer_id>', methods=['DELETE'])
@login_required
def delete_answer(answer_id):
    """Delete an answer (owner only)"""
    answer = Answer.query.get(answer_id)

    if not answer:
        return jsonify({"error": "Answer not found"}), 404
    if answer.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(answer)
    db.session.commit()
    return jsonify({"message": "Answer deleted successfully"}), 200

from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, User, ChatSession, Message, Product
from app.llm_service import get_llm_response
from datetime import datetime

app = Flask(__name__)
engine = create_engine('sqlite:///ecommerce.db')
SessionLocal = sessionmaker(bind=engine)

@app.route('/api/chat', methods=['POST'])
def chat():
    db = SessionLocal()
    data = request.get_json()
    
    user_id = data.get('user_id')
    message_text = data.get('message')
    conversation_id = data.get('conversation_id')

    if not user_id or not message_text:
        return jsonify({'error': 'user_id and message are required'}), 400

    # Step 1: Create or get chat session
    if not conversation_id:
        session = ChatSession(user_id=user_id, created_at=datetime.utcnow(), session_name="Chat Session")
        db.add(session)
        db.commit()
        db.refresh(session)
        conversation_id = session.id
    else:
        session = db.query(ChatSession).filter_by(id=conversation_id).first()
        if not session:
            return jsonify({'error': 'Invalid conversation_id'}), 404

    # Step 2: Store user message
    user_msg = Message(
        session_id=conversation_id,
        sender='user',
        message=message_text,
        created_at=datetime.utcnow()
    )
    db.add(user_msg)

    # Step 3: Create LLM prompt
    message_history = [
        {"role": "system", "content": "You are a helpful AI assistant for an eCommerce site. Ask clarifying questions if information is incomplete."},
        {"role": "user", "content": message_text}
    ]

    # Optional: Basic business logic before calling LLM
    if "red dress" in message_text.lower():
        product = db.query(Product).filter(Product.name.ilike("%red dress%")).first()
        if product:
            ai_reply_text = f"We have a red dress in {product.department} at ₹{product.retail_price}."
        else:
            ai_reply_text = "Sorry, we couldn't find a red dress in stock."
    else:
        # Step 4: Get LLM response
        ai_reply_text = get_llm_response(message_history)

    # Step 5: Store bot response
    ai_msg = Message(
        session_id=conversation_id,
        sender='bot',
        message=ai_reply_text,
        created_at=datetime.utcnow()
    )
    db.add(ai_msg)
    db.commit()

    # Step 6: Return chat history
    messages = db.query(Message).filter_by(session_id=conversation_id).order_by(Message.created_at).all()
    chat_history = [
        {
            'sender': m.sender,
            'message': m.message,
            'timestamp': m.created_at.isoformat()
        } for m in messages
    ]

    return jsonify({
        'conversation_id': conversation_id,
        'messages': chat_history
    })

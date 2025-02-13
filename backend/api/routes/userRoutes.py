from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
userBp = Blueprint("user", __name__)
userDB = db['user']
memberCollection = userDB['member']

@userBp.route('/login', methods=['POST'])
def login():
    userID = request.get_json()
    user = memberCollection.find_one({'userLineliffID': userID})
    
    if user:
        return 'login successful'
    
    if not user:
        memberCollection.inser_one({'userLineliffID': userID, 'projects': []})
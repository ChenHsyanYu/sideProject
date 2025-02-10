from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
billingBp = Blueprint("billing", __name__)
billingDB = db['projects']
billingCollection = billingDB['billing']


# @billingBp.route('/billInfo', methods=['GET'])
# def fetchBills():
#     data = 
    
    
 
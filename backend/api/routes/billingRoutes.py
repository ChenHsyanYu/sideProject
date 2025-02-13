from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
billingBp = Blueprint("billing", __name__)
billingDB = db['projects']
billingCollection = billingDB['billing']


@billingBp.route('/editBill', methods=['POST'])
def editBills():
    
    
@billingBp.route('/addBill', methods=['POST'])
def addBill(): 
 
 
@billingBp.route('/deleteBill', methods=['DELETE'])
def deleteBill():
    

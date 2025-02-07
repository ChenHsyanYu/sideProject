from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
userBp = Blueprint("user", __name__)
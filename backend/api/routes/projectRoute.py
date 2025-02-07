from flask import request, Blueprint, jsonify


import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
projectBp = Blueprint("project", __name__)



@projectBp.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@projectBp.route("/project", methods=["GET"])
def project():
    projectCollection = db['projects']['project']
    projectInfo = list(projectCollection.find({}, {"_id":0}))
    return jsonify(projectInfo)

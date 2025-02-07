from flask import request, Blueprint, jsonify
from database.db import client as db

projectBp = Blueprint("project", __name__)



@app.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@app.route("/project", methods=["GET"])
def project():
    projectCollection = db['projects']['project']
    projectInfo = list(projectCollection.find({}, {"_id":0}))
    return jsonify(projectInfo)

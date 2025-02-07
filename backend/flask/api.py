from flask import Flask, request, jsonify
# from db import allProjects  # 匯入 MongoDB 連接

app = Flask(__name__)

@app.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@app.route("/project", methods=["GET"])
def project():
    return "get all projects"


if __name__ == "__main__":
    app.run(debug=True) 
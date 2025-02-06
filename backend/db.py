
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://sharonchen82228:01020304@billinprojects.7yw5b.mongodb.net/?retryWrites=true&w=majority&appName=billinProjects"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['projects']
allProjects = db['project']
print(client.list_database_names())

# Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)
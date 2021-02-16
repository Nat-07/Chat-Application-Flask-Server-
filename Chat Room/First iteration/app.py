import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

# when the server detects event submit message...
@socketio.on("submit message")
def vote(data):
    #parse
    selection = data["selection"]
    # emitting out to all connections computers 
    emit("announce message", {"selection": selection}, broadcast = True)
 
# when run start the flask app
if __name__ == "__main__":
    app.run(debug=True, host= '0.0.0.0')

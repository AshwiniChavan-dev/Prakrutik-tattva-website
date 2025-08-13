from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# -------------------------
# Database Configuration
# -------------------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "database.db")
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_PATH}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# -------------------------
# Database Models
# -------------------------
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

# -------------------------
# Create DB tables if not exist
# -------------------------
with app.app_context():
    db.create_all()

# -------------------------
# Routes
# -------------------------
@app.route('/')
def home():
    return render_template("base.html")  # This will load base.html from /templates

# Example route to add a product (optional)
@app.route('/add-sample')
def add_sample():
    sample = Product(name="Sample Oil", price=250.0)
    db.session.add(sample)
    db.session.commit()
    return "Sample product added!"

# -------------------------
# Main Entry Point
# -------------------------
if __name__ == '__main__':
    # Debug mode only for local development
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
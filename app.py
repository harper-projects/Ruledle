from flask import Flask, render_template, request, session
import random
import os
from rules import RULES

app = Flask(__name__)
app.secret_key = "supersecret"  # Needed for sessions

@app.route("/", methods=["GET", "POST"])
def index():
    if "rule" not in session:
        session["rule"] = random.choice(RULES)

    feedback = ""
    if request.method == "POST":
        user_input = request.form["text"]
        rule = session["rule"]

        if user_input.lower().startswith("guess:"):
            guess = user_input[6:].strip().lower()
            if guess in rule['description'].lower():
                feedback = f"✅ Correct! The rule was: {rule['description']}"
                session.pop("rule", None)
            else:
                feedback = "❌ Incorrect guess. Keep trying!"
        else:
            if rule["check"](user_input):
                feedback = "✅ Rule followed"
            else:
                feedback = "❌ Rule broken"

    return render_template("index.html", feedback=feedback)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

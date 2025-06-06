# More Rules will be added in the future
RULES = [
    {
        "description": "No words with the letter 'e'",
        "check": lambda text: 'e' not in text.lower()
    },
    {
        "description": "Must end with a question mark",
        "check": lambda text: text.strip().endswith("?")
    },
    {
        "description": "Exactly 5 words",
        "check": lambda text: len(text.strip().split()) == 5
    }
]


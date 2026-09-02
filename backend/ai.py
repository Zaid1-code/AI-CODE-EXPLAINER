import os

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from .env")


# =========================================================
# GEMINI CLIENT
# =========================================================

client = genai.Client(api_key=api_key)


# =========================================================
# EXPLAIN CODE
# =========================================================

def explain_code(code: str, language: str) -> str:

    prompt = f"""
You are an expert programming teacher.

Analyze the following {language} code.

Give the response in this exact structure:

## Explanation
Explain what the code does in simple language.

## How It Works
Explain the important parts step by step.

## Potential Issues
Mention bugs, errors, or risky practices if there are any.
If there are no issues, say "No obvious issues found."

## Improvements
Suggest useful improvements.

## Complexity
Give the approximate time and space complexity if applicable.

Code:

{code}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text


# =========================================================
# FIND BUGS
# =========================================================

def find_bugs(code: str, language: str) -> str:

    prompt = f"""
You are an 40 years experience expert software engineer and code reviewer.

Analyze the following {language} code specifically for bugs and problems.

Give the response in this exact structure:

## Bugs Found
List every actual bug you can identify.
If there are no bugs, say "No obvious bugs found."

## Edge Cases
Mention inputs or situations that could cause unexpected behavior.

## Security Issues
Mention security vulnerabilities if applicable.
If there are none, say "No obvious security issues found."

## Recommended Fixes
Explain how to fix each important problem.

## Corrected Code
Provide an improved version of the code only if changes are needed.

Code:

{code}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text
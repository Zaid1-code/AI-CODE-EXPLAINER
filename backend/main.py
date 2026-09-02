from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.ai import explain_code, find_bugs


# =========================================================
# APP
# =========================================================

app = FastAPI(title="AI Code Explainer")


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODEL
# =========================================================

class CodeRequest(BaseModel):
    code: str
    language: str


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "AI Code Explainer API is running 🚀"
    }


# =========================================================
# EXPLAIN CODE
# =========================================================

@app.post("/explain")
def explain(request: CodeRequest):

    result = explain_code(
        request.code,
        request.language
    )

    return {
        "explanation": result
    }


# =========================================================
# FIND BUGS
# =========================================================

@app.post("/bugs")
def bugs(request: CodeRequest):

    result = find_bugs(
        request.code,
        request.language
    )

    return {
        "bugs": result
    }
from fastapi import FastAPI, UploadFile, File
from typing import List
import shutil
import os

from app.parser import extract_text
from app.embeddings import get_embedding
from app.ranking import get_similarity
from app.csv_generator import generate_csv
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create folders automatically
os.makedirs("uploads/jobs", exist_ok=True)
os.makedirs("uploads/resumes", exist_ok=True)


@app.get("/")
def home():
    return {"message": "AI Recruiter Backend Running"}


# Upload Job Description
@app.post("/upload-job")
async def upload_job(file: UploadFile = File(...)):
    file_path = f"uploads/jobs/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Job uploaded successfully",
        "filename": file.filename
    }


# Upload Multiple Resumes
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    file_path = f"uploads/resumes/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


@app.get("/read-job")
def read_job():
    files = os.listdir("uploads/jobs")

    if not files:
        return {"message": "No job uploaded"}

    path = f"uploads/jobs/{files[0]}"

    text = extract_text(path)

    return {"text": text}



@app.get("/read-resumes")
def read_resumes():
    resumes = []

    files = os.listdir("uploads/resumes")

    for file in files:
        path = f"uploads/resumes/{file}"

        text = extract_text(path)

        resumes.append({
            "filename": file,
            "text": text
        })

    return resumes
@app.get("/rank")
def rank_candidates():

    job_files = os.listdir("uploads/jobs")

    if not job_files:
        return {"message": "No job uploaded"}

    # Read Job Description
    job_path = f"uploads/jobs/{job_files[0]}"
    job_text = extract_text(job_path)
    job_embedding = get_embedding(job_text)

    candidates = []

    # Read Resumes
    resume_files = os.listdir("uploads/resumes")

    for file in resume_files:
        resume_path = f"uploads/resumes/{file}"

        resume_text = extract_text(resume_path)
        resume_embedding = get_embedding(resume_text)

        score = get_similarity(
            job_embedding,
            resume_embedding
        )

        score_percent = round(score * 100, 2)

        # Generate reasoning
        if score_percent >= 80:
            reason = "Excellent match. Candidate has strong semantic similarity with the job description."
        elif score_percent >= 60:
            reason = "Good match. Candidate has relevant skills and experience."
        elif score_percent >= 40:
            reason = "Average match. Candidate partially matches the requirements."
        else:
            reason = "Low match. Candidate has limited relevance to the job description."

        candidates.append({
            "filename": file,
            "score": score_percent,
            "reasoning": reason
        })

    # Sort by score
    candidates.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    # Assign ranks
    rank = 1

    for candidate in candidates:
        candidate["rank"] = rank
        rank += 1
    generate_csv(candidates)
    return candidates



@app.get("/download")
def download_csv():
    return FileResponse(
        "outputs/submission.csv",
        media_type="text/csv",
        filename="submission.csv"
    )
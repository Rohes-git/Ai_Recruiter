from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def get_similarity(job_embedding, resume_embedding):
    similarity = cosine_similarity(
        [job_embedding],
        [resume_embedding]
    )

    return float(similarity[0][0])
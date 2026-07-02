import csv
import os


def generate_csv(candidates):
    os.makedirs("outputs", exist_ok=True)

    file_path = "outputs/submission.csv"

    with open(file_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        writer.writerow([
            "candidate_id",
            "rank",
            "score",
            "reasoning"
        ])

        for i, candidate in enumerate(candidates):
            candidate_id = f"CAND_{i+1:07d}"

            writer.writerow([
                candidate_id,
                candidate["rank"],
                candidate["score"],
                candidate["reasoning"]
            ])

    return file_path
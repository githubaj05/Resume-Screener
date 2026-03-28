## AI Powered Resume Screener

## Overview

This project is a frontend-based AI-inspired Resume Screener that allows HR users to upload multiple resumes and compare them against a Job Description (JD). 
The system ranks candidates based on skill matching and assigns a score.

---

## Features
Upload multiple resumes (PDF/DOC)
Enter Job Description (JD)
Extract keywords from JD
Match skills with resumes
Rank candidates based on match score
Tag candidates as Shortlist / Maybe / Reject

---

## Approach
This project simulates an AI-based screening system using:

Keyword Extraction (NLP basics)
- Clean text
- Remove stopwords
- Extract meaningful keywords
- 
Skill Filtering
- Uses a predefined skill dictionary
- Filters only relevant technical skills
- 
Matching Logic
- Compares JD skills with resume tokens
- 
Scoring System
- Custom non-linear scoring curve
- More matches → higher score

---

## Tech Stack
- HTML
- CSS
- JavaScript

---

## How to Run
1. Download or clone the repository
1. Open index.html in browser
2. Upload resumes
3. Enter Job Description
4. Click Parse

---

## Sample Data
- 7 sample resumes included in /sample_data
- Sample Job Description provided

## Demo
Loom Video Link:  
https://www.loom.com/share/1fdc106aaed14fc1a620af57731f44cb

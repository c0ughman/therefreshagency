#!/usr/bin/env python3
import subprocess
import os
from pathlib import Path

def get_video_duration(video_path):
    try:
        cmd = ['ffprobe', '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(video_path)]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    except:
        return None

def extract_screenshot(video_path, output_path, timestamp):
    try:
        cmd = ['ffmpeg', '-y', '-i', str(video_path), '-ss', str(timestamp), '-vframes', '1', '-q:v', '2', str(output_path)]
        subprocess.run(cmd, capture_output=True, text=True, check=True)
        return True
    except:
        return False

# Extract missing screenshots
project_root = Path(__file__).parent
public_dir = project_root / "public"
screenshots_dir = public_dir / "video-screenshots"

missing_screenshots = [
    ("briefed.mp4", "briefed", 80),
    ("gather.mp4", "gather", 10),
    ("huella-real.mp4", "huella-real", 50),
    ("designer-knit.mp4", "designer-knit", 0)
]

for video_file, project_name, percentage in missing_screenshots:
    video_path = public_dir / video_file
    if not video_path.exists():
        print(f"Video not found: {video_file}")
        continue
        
    project_dir = screenshots_dir / project_name
    project_dir.mkdir(exist_ok=True)
    
    duration = get_video_duration(video_path)
    if duration is None:
        print(f"Could not get duration for {video_file}")
        continue
        
    timestamp = (percentage / 100) * duration
    output_filename = f"{project_name}_{percentage:02d}percent.jpg"
    output_path = project_dir / output_filename
    
    print(f"Extracting {project_name} at {percentage}%...")
    if extract_screenshot(video_path, output_path, timestamp):
        print(f"✅ Success: {output_path}")
    else:
        print(f"❌ Failed: {project_name}")

print("Done!")

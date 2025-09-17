#!/usr/bin/env python3
"""
Try portrait orientation for huella-real video
"""

import os
import subprocess
from pathlib import Path

def create_portrait_version():
    """Create a portrait version of the video"""
    
    input_file = Path('./public/huella-real.mp4.original')
    output_file = Path('./public/huella-real-portrait.mp4')
    
    if not input_file.exists():
        print("Original backup not found!")
        return False
    
    print("Creating portrait version (9:16 aspect ratio)...")
    
    # Try portrait orientation with proper scaling
    cmd = [
        'ffmpeg', '-i', str(input_file),
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '28',
        '-vf', 'scale=540:960:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=540:960:(ow-iw)/2:(oh-ih)/2',
        '-c:a', 'aac',
        '-b:a', '64k',
        '-ac', '1',
        '-movflags', '+faststart',
        '-pix_fmt', 'yuv420p',
        '-y',
        str(output_file)
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"✅ Portrait version created: {output_file.name} ({size_mb:.1f}MB)")
        
        # Also create a square version
        square_file = Path('./public/huella-real-square.mp4')
        cmd_square = [
            'ffmpeg', '-i', str(input_file),
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '28',
            '-vf', 'scale=720:720:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=720:720:(ow-iw)/2:(oh-ih)/2',
            '-c:a', 'aac',
            '-b:a', '64k',
            '-ac', '1',
            '-movflags', '+faststart',
            '-pix_fmt', 'yuv420p',
            '-y',
            str(square_file)
        ]
        
        subprocess.run(cmd_square, check=True, capture_output=True)
        size_square = os.path.getsize(square_file) / (1024 * 1024)
        print(f"✅ Square version created: {square_file.name} ({size_square:.1f}MB)")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🔄 Creating alternative aspect ratio versions")
    print("=" * 50)
    
    create_portrait_version()
    
    print("\nNow you have multiple versions to test:")
    print("- huella-real.mp4 (current fixed version)")
    print("- huella-real-portrait.mp4 (9:16 portrait)")
    print("- huella-real-square.mp4 (1:1 square)")
    print("- huella-real.mp4.original (backup)")
    print("\nTest these in your browser and let me know which looks correct!")

if __name__ == "__main__":
    main()

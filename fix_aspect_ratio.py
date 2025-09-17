#!/usr/bin/env python3
"""
Fix aspect ratio for huella-real.mp4
This script will recompress the video while preserving its original aspect ratio
"""

import os
import subprocess
import json
from pathlib import Path

def get_video_info(video_path):
    """Get detailed video information"""
    cmd = ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_streams', str(video_path)]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)

def fix_aspect_ratio(input_path, output_path, target_size_mb=4):
    """
    Recompress video with proper aspect ratio preservation
    """
    print(f"Analyzing {input_path.name}...")
    
    # Get video info
    info = get_video_info(input_path)
    video_stream = next(s for s in info['streams'] if s['codec_type'] == 'video')
    
    width = video_stream['width']
    height = video_stream['height']
    duration = float(video_stream['duration'])
    
    # Calculate original aspect ratio
    aspect_ratio = width / height
    print(f"  Current resolution: {width}x{height}")
    print(f"  Aspect ratio: {aspect_ratio:.3f}")
    print(f"  Duration: {duration:.1f}s")
    
    # Determine if this looks like a stretched video
    # Common aspect ratios: 16:9 ≈ 1.778, 4:3 ≈ 1.333, 1:1 = 1.0, 9:16 ≈ 0.563
    if abs(aspect_ratio - 1.778) < 0.01:
        print("  This appears to be 16:9 - might be incorrectly stretched")
        # Try different common aspect ratios
        print("  Trying portrait orientation (9:16)...")
        scale_filter = "scale=540:960:force_original_aspect_ratio=decrease:force_divisible_by=2"
    elif aspect_ratio > 1.5:
        print("  Landscape video detected")
        # Keep landscape but ensure proper scaling
        scale_filter = "scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2"
    else:
        print("  Portrait/square video detected")
        # Portrait video
        scale_filter = "scale=720:1280:force_original_aspect_ratio=decrease:force_divisible_by=2"
    
    # Calculate target bitrate
    target_bitrate = int((target_size_mb * 8 * 1024) / duration * 0.85)
    target_bitrate = max(target_bitrate, 300)  # Minimum 300kbps
    
    print(f"  Target bitrate: {target_bitrate}kbps")
    print(f"  Scale filter: {scale_filter}")
    
    # Compression command with proper aspect ratio handling
    cmd = [
        'ffmpeg', '-i', str(input_path),
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', '28',
        '-b:v', f'{target_bitrate}k',
        '-maxrate', f'{target_bitrate * 1.5}k',
        '-bufsize', f'{target_bitrate * 2}k',
        '-vf', scale_filter,
        '-c:a', 'aac',
        '-b:a', '64k',
        '-ac', '1',
        '-movflags', '+faststart',
        '-pix_fmt', 'yuv420p',
        '-y',
        str(output_path)
    ]
    
    print("  Compressing with aspect ratio preservation...")
    subprocess.run(cmd, check=True, capture_output=True)
    
    # Check results
    input_size = os.path.getsize(input_path) / (1024 * 1024)
    output_size = os.path.getsize(output_path) / (1024 * 1024)
    
    # Get new video info
    new_info = get_video_info(output_path)
    new_video = next(s for s in new_info['streams'] if s['codec_type'] == 'video')
    new_width = new_video['width']
    new_height = new_video['height']
    new_aspect = new_width / new_height
    
    print(f"  ✅ Result: {new_width}x{new_height} (aspect: {new_aspect:.3f})")
    print(f"  ✅ Size: {input_size:.1f}MB → {output_size:.1f}MB")
    
    return True

def main():
    print("🔧 Fixing Aspect Ratio for huella-real.mp4")
    print("=" * 50)
    
    video_file = Path('./public/huella-real.mp4')
    if not video_file.exists():
        print("huella-real.mp4 not found!")
        return
    
    # Create backup and temporary files
    backup_path = video_file.with_suffix('.mp4.original')
    temp_fixed = video_file.with_suffix('.fixed.mp4')
    
    # Backup current version
    print("Creating backup...")
    video_file.rename(backup_path)
    
    try:
        # Fix the video
        if fix_aspect_ratio(backup_path, temp_fixed, target_size_mb=4):
            # Replace with fixed version
            temp_fixed.rename(video_file)
            print("\n✅ Video aspect ratio fixed successfully!")
            print("The original (potentially stretched) version has been backed up as .original")
        else:
            # Restore backup
            backup_path.rename(video_file)
            print("\n❌ Failed to fix aspect ratio, restored original")
            
    except Exception as e:
        print(f"\n❌ Error: {e}")
        # Restore backup
        if backup_path.exists():
            backup_path.rename(video_file)
        if temp_fixed.exists():
            temp_fixed.unlink()

if __name__ == "__main__":
    main()

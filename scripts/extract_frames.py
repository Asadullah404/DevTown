import cv2
import os
import sys

def extract_video_frames(video_path, output_dir, target_frames=75, max_width=1280):
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found")
        return 0

    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Processing {video_path}: {orig_w}x{orig_h}, {total_frames} frames ({total_frames/fps:.1f}s)")
    
    scale = min(1.0, max_width / orig_w) if orig_w > max_width else 1.0
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    
    step = max(1, total_frames // target_frames)
    frame_indices = [i for i in range(0, total_frames, step)][:target_frames]
    
    saved_count = 0
    total_bytes = 0
    
    for idx, f_idx in enumerate(frame_indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
        ret, frame = cap.read()
        if not ret:
            continue
        
        if scale < 1.0:
            frame = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)
            
        out_filename = f"frame_{idx:03d}.webp"
        out_path = os.path.join(output_dir, out_filename)
        
        # Save as optimized WebP (quality 82 balances sharp visuals and tiny file size)
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 82])
        size = os.path.getsize(out_path)
        total_bytes += size
        saved_count += 1

    cap.release()
    print(f"Extracted {saved_count} frames to {output_dir} ({total_bytes / (1024*1024):.2f} MB total, ~{total_bytes//saved_count//1024} KB/frame)")
    return saved_count

if __name__ == "__main__":
    os.makedirs("public/frames/sequence1", exist_ok=True)
    os.makedirs("public/frames/sequence2", exist_ok=True)
    
    print("--- Extracting Sequence 1 (Hero Ambient Glass Space) ---")
    extract_video_frames("video1.mp4", "public/frames/sequence1", target_frames=72, max_width=1280)
    
    print("--- Extracting Sequence 2 (Cyber Portal to HUD Dashboard Frame) ---")
    extract_video_frames("video2.mp4", "public/frames/sequence2", target_frames=72, max_width=1280)

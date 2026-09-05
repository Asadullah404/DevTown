import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # Create image with deep obsidian dark background
    img = Image.new('RGB', (width, height), color='#06080e')
    draw = ImageDraw.Draw(img)
    
    # Draw ambient dark blue/cyan gradient overlay
    for y in range(height):
        r = int(6 + (y / height) * 8)
        g = int(8 + (y / height) * 12)
        b = int(14 + (y / height) * 26)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Draw outer subtle border
    draw.rounded_rectangle(
        [(24, 24), (width - 24, height - 24)],
        radius=24,
        outline=(255, 255, 255, 30),
        width=1
    )
    
    # Draw cyan accent glow at top
    draw.line([(100, 24), (width - 100, 24)], fill=(6, 182, 212, 180), width=2)
    
    # Fonts: try default or system font
    try:
        font_title = ImageFont.truetype("arial.ttf", 64)
        font_brand = ImageFont.truetype("arial.ttf", 24)
        font_sub = ImageFont.truetype("arial.ttf", 32)
        font_tag = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font_title = font_brand = font_sub = font_tag = ImageFont.load_default()
        
    # Pill badge
    badge_text = "● DEVTOWN.LIVE • VERIFIED WEB & AI ENGINEERING"
    draw.rounded_rectangle([(80, 80), (660, 126)], radius=23, fill=(255, 255, 255, 12), outline=(255, 255, 255, 30))
    draw.text((105, 95), badge_text, fill=(16, 185, 129), font=font_brand)
    
    # Brand
    draw.text((80, 160), "DEVTOWN", fill=(255, 255, 255), font=font_title)
    
    # Subtitle / Core keywords
    subtitle_lines = [
        "Build, Automate & Scale Production Software.",
        "Custom Web Applications • AI Agents • Enterprise Dashboards"
    ]
    draw.text((80, 255), subtitle_lines[0], fill=(226, 232, 240), font=font_sub)
    draw.text((80, 305), subtitle_lines[1], fill=(148, 163, 184), font=font_sub)
    
    # Separator line
    draw.line([(80, 380), (width - 80, 380)], fill=(255, 255, 255, 25), width=1)
    
    # Feature bullets
    bullets = [
        "✓ Fixed-Price Quotes",
        "✓ 3–14 Day Delivery",
        "✓ Next.js & Hostinger Verified",
        "✓ 100% Code Ownership"
    ]
    start_x = 80
    for bullet in bullets:
        draw.text((start_x, 420), bullet, fill=(56, 189, 248), font=font_tag)
        start_x += 270
        
    # Bottom Stack bar
    draw.rounded_rectangle([(80, 480), (width - 80, 550)], radius=16, fill=(15, 23, 42), outline=(255, 255, 255, 20))
    stack_text = "Domain: devtown.live • Tech: Next.js 14 • React • TypeScript • Python AI • Hostinger"
    draw.text((110, 502), stack_text, fill=(148, 163, 184), font=font_tag)
    
    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")
    img.save(output_path, "PNG", quality=95)
    print(f"OG Image generated at: {output_path} (Size: {os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    generate_og_image()

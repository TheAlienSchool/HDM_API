import glob
import re

html_files = glob.glob('*.html') + glob.glob('explorers/*.html')
count = 0

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We look for the setTimeout block and replace the whole else block if it doesn't have style.transition
    if "Cross-page transition fade out" in content and "document.body.style.transition = 'opacity 0.4s ease-out';" not in content:
        pattern = r"(// Cross-page transition fade out\s+e\.preventDefault\(\);\s+)(document\.body\.classList\.remove\('is-loaded'\);)"
        replacement = r"\1document.body.style.transition = 'opacity 0.4s ease-out';\n          \2"
        
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1

print(f"Updated {count} files with buttery smooth transition timings.")

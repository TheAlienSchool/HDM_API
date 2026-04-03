import glob
import re

html_files = glob.glob('*.html') + glob.glob('explorers/*.html')
count = 0

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "document.body.classList.remove('is-loaded');" in content and "document.body.style.transition" not in content and "e.preventDefault();" in content:
        content = re.sub(
            r"e\.preventDefault\(\);\s*document\.body\.classList\.remove\('is-loaded'\);",
            "e.preventDefault();\n          document.body.style.transition = 'opacity 0.4s ease-out';\n          document.body.classList.remove('is-loaded');",
            content
        )
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files with new transition logic.")

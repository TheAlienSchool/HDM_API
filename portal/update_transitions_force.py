import glob

html_files = glob.glob('*.html') + glob.glob('explorers/*.html')
count = 0

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We look for the exact string to replace
    target = r"""          // Cross-page transition fade out
          e.preventDefault();
          document.body.classList.remove('is-loaded');"""
          
    replacement = r"""          // Cross-page transition fade out
          e.preventDefault();
          document.body.style.transition = 'opacity 0.4s ease-out';
          document.body.classList.remove('is-loaded');"""
    
    if target in content:
        content = content.replace(target, replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Brute force string replace updated {count} files.")

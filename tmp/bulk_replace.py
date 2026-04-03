import os
import re

replacements = [
    (r'The Steeperverse Ecosystem', 'HDM Insights Academy (HIA)'),
    (r'The Steeperverse', 'HDM Insights Academy (HIA)'),
    (r'Steeperverse', 'HIA'),
    (r'Cartridges', 'Insight Instruments'),
    (r'Cartridge(?!\sSlot)', 'Insight Instrument'),
    (r'Marco Laboratories', 'Macro Laboratories'),
    (r'QWP Console', 'HIA Hub'),
    (r'Ecosystem Hub', 'HIA Hub'),
    (r'Engine Room', 'HIA Foundation'),
    (r'href="/portal/', 'href="/'),
    (r'src="/portal/', 'src="/'),
    (r'href="portal/', 'href="'),
    (r'src="portal/', 'src="'),
    (r"href='/portal/", "href='/"),
    (r"src='/portal/", "src='/"),
    (r"href='portal/", "href='"),
    (r"src='portal/", "src='")
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return
        
    original = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if '.git' in root or '.venv' in root or 'node_modules' in root or '__pycache__' in root or 'tmp' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.md', '.css')) and file not in ['HIA_Architecture_Portrait.md', 'HANDOFF_TO_ANTIGRAVITY.md', 'task.md', 'implementation_plan.md']:
            process_file(os.path.join(root, file))

print("Bulk replacement complete.")

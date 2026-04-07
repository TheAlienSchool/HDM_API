import os
import glob

def run():
    files = []
    
    # gather all html and md
    for ext in ['*.html', '*.md']:
        files.extend(glob.glob('**/' + ext, recursive=True))
    
    for f in files:
        if 'node_modules' in f or '.git' in f or '.venv' in f:
            continue
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            
            new_content = content.replace(" — ", " :: ").replace("—", " :: ")
            
            if new_content != content:
                with open(f, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Replaced em dashes in {f}")
        except Exception as e:
            pass

if __name__ == '__main__':
    run()

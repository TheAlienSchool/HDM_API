import os
import re

def remove_duplicate_stillness(directory):
    print(f"Scanning directory: {directory}")
    pattern = re.compile(r"<!--\s*TEA\s*ON\s*THE\s*MOON\s*PROTOCOL\s*-->\s*<script>[\s\S]*?<\/script>", re.IGNORECASE)
    
    count_files_changed = 0
    for root, dirs, files in os.walk(directory):
        # Skip hidden directories like .venv or .git
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if pattern.search(content):
                        new_content = pattern.sub("", content)
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"  [UPDATED] {filepath} - removed duplicate stillness script")
                        count_files_changed += 1
                except Exception as e:
                    print(f"  [ERROR] reading/writing {filepath}: {e}")
                    
    print(f"Cleanup complete. Modified {count_files_changed} HTML files.")

if __name__ == '__main__':
    workspace_dir = r"c:\Users\Kzaka\Documents\GitHub\HDM_API"
    remove_duplicate_stillness(workspace_dir)

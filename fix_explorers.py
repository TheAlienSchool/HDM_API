import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Fix Tone.js integrity bug across all files
    content = content.replace('integrity="sha512-U49h7qv++IYvU7QjksOuPXWJRsoX0eWX3nz9X2pgNkAEIwjsN5bQB0v4J1igQ1hKFWPF3Ij8qiYKVw8O9WCpg==\\"',
                              'integrity="sha512-U49h7qv++IYvU7QjksOuPXWJRsoX0eWX3nz9X2pgNkAEIwjsN5bQB0v4J1igQ1hKFWPF3Ij8qiYKVw8O9WCpg=="')

    # 2. Wrap inline logic and add ResizeObserver
    # We look for <script> blocks that define `function init()`.
    # Only if it's the main inline script.
    
    # A simple regex to find the script block containing `function init()` and `window.hdmApp`
    pattern = re.compile(r'(<script>)(.*?(?:function init\(\)|function boot\(\)|resizeCanvas\(\)).*?)(</script>)', re.DOTALL)
    
    def replacer(match):
        script_open = match.group(1)
        body = match.group(2)
        script_close = match.group(3)
        
        # Avoid wrapping if it's already wrapped in an IIFE
        if "})();\n" in body[-20:] or "(function()" in body[:20]:
            return match.group(0)
            
        # Avoid wrapping small/trivial scripts
        if "THREE." not in body and "attractor-canvas" not in body and "playTone(" not in body:
            return match.group(0)
            
        # Add the IIFE wrapper
        new_body = "\n(function() {" + body + "})();\n"
        
        # Optional: Add ResizeObserver if it's a THREE scene or Canvas
        if "renderer.setSize" in new_body and "ResizeObserver" not in new_body:
            ro = """
        // ── BULLETPROOF RESIZE OBSERVER ──
        if (typeof ResizeObserver !== 'undefined' && container) {
            new ResizeObserver(() => {
                if(container.clientWidth > 0 && container.clientHeight > 0) onResize();
            }).observe(container);
        }
"""
            new_body = new_body.replace('    function onResize() {', ro + '\n    function onResize() {')
            
        return script_open + new_body + script_close

    new_content = pattern.sub(replacer, content)
    
    if new_content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {os.path.basename(filepath)}")

base_dir = r"c:\Users\Kzaka\Documents\GitHub\HDM_API\explorers"
for f in glob.glob(os.path.join(base_dir, "*.html")):
    fix_file(f)

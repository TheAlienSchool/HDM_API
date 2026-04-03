import os
import re

target_files = [
    'HDM Exploratorium v4.html',
    'HDM Resonance Library.html',
    'The Crossover — Two Portals One Field.html',
    'index.html',
    'HDM Dodecahedral Capstones.html',
    'HDM_Silent_Treatment/index.html'
]

def transform_content(text):
    # 1. Replace em-dashes
    # We replace surrounded by spaces: " — " -> " :: "
    text = re.sub(r'\s+—\s+', ' :: ', text)
    # the unicode character: 
    text = re.sub(r'—', '::', text)
    # also handle en-dash if used as em-dash
    text = re.sub(r'\s+–\s+', ' :: ', text)

    # 2. Replace you/your -> we/our
    # We want to replace whole words only, avoiding things like "young" or "yourself" directly 
    # (actually "yourself" -> "ourselves")
    text = re.sub(r'\b[Yy]ourself\b', lambda m: 'Ourselves' if m.group(0)[0].isupper() else 'ourselves', text)
    text = re.sub(r'\b[Yy]ourselves\b', lambda m: 'Ourselves' if m.group(0)[0].isupper() else 'ourselves', text)
    text = re.sub(r'\b[Yy]ours\b', lambda m: 'Ours' if m.group(0)[0].isupper() else 'ours', text)
    text = re.sub(r'\b[Yy]our\b', lambda m: 'Our' if m.group(0)[0].isupper() else 'our', text)
    
    # "you" is tricky. Sometimes it's subject ("You are") -> "We are"
    # Sometimes it's object ("It tells you") -> "It tells us"
    # We will do a generic replacement:
    # "You are" -> "We are"
    text = re.sub(r'\b([Yy]ou)\s+(are|re)\b', lambda m: ('We' if m.group(1)[0].isupper() else 'we') + ' ' + m.group(2), text)
    text = re.sub(r'\b([Yy]ou)\s+(have|ve)\b', lambda m: ('We' if m.group(1)[0].isupper() else 'we') + ' ' + m.group(2), text)
    text = re.sub(r'\b([Yy]ou)\s+(will|ll)\b', lambda m: ('We' if m.group(1)[0].isupper() else 'we') + ' ' + m.group(2), text)
    text = re.sub(r'\b([Yy]ou)\s+(can|could|would|should|must|do)\b', lambda m: ('We' if m.group(1)[0].isupper() else 'we') + ' ' + m.group(2), text)
    
    # Capitalized "You" almost always starts a sentence -> "We"
    text = re.sub(r'\bYou\b', 'We', text)
    
    # Lowercase "you" could be object. Let's make it "us" by default, unless it's followed by a verb (which we caught most of).
    # But wait, "when you look" -> "when us look" - wrong.
    # Actually, as a collective experience "we/our/us" is better. Let's do:
    # "to you" -> "to us"
    # "for you" -> "for us"
    # "with you" -> "with us"
    text = re.sub(r'\b(to|for|with|tell|show|give|guide|let)\s+you\b', r'\1 us', text)
    
    # Defaulting remaining lowercase "you" to "we" is safer for instruction/philosophical text than "us"
    text = re.sub(r'\byou\b', 'we', text)
    
    return text


for f in target_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = transform_content(content)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        
        print(f"Processed: {f}")
    else:
        print(f"Not found: {f}")

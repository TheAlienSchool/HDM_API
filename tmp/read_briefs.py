import zipfile
import xml.etree.ElementTree as ET
import os

def extract_docx_text(docx_path):
    if not os.path.exists(docx_path):
        return f"File not found: {docx_path}"
    try:
        with zipfile.ZipFile(docx_path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            
            # Namespaces
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for para in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in para.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append(''.join(texts))
            
            return '\n\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading file: {e}"

briefs_dir = r"c:\Users\Kzaka\Documents\GitHub\HDM_API\Phi to Explore\THE φ OCEAN_Development Brief"
files = [
    "THE φ OCEAN __ Architectural Proposal for the Phi Explorer Expansion.docx",
    "THE φ OCEAN __ Development Manual — A Legendary Instruction for the Consciously Staged, Fundamentally Architected, and Mathemagically Aware Build.docx",
    "The Harmonic Lineage_ Sound, Healing, and the Mathematics That Connects Them All.docx"
]

for idx, file in enumerate(files):
    full_path = os.path.join(briefs_dir, file)
    print(f"=== EXTRACTING FILE {idx+1} ===")
    text = extract_docx_text(full_path)
    
    # Save as text file in the brief directory
    out_name = file.replace(".docx", ".txt")
    out_path = os.path.join(briefs_dir, out_name)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Saved to output text file index {idx+1} ({len(text)} chars)")

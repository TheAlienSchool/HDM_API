import fitz
import re

file_path = r"C:\Users\Kzaka\Dropbox\TSK\THE ALIEN SCHOOL\HDM_2025\Open Richard_Rudd-_Gene_Keys_Unlocking_The_Hi.pdf"

primary_keywords = ['mathematics', 'tetrahedral', 'trinary', 'geometry', 'threefold', 'pattern', 'codon', 'dna', 'physiology']
interesting_pages = {}

try:
    doc = fitz.open(file_path)
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text = page.get_text("text").lower()
        
        # We replace newline just for our regex counting string
        flat_text = text.replace("\n", " ")
        
        matches = {kw: len(re.findall(r'\b' + kw + r'\w*', flat_text)) for kw in primary_keywords}
        
        score = sum(matches.values())
        if score > 0:
            weight = (matches['mathematics'] * 30) + \
                     (matches['tetrahedral'] * 50) + \
                     (matches['trinary'] * 40) + \
                     (matches['geometry'] * 30) + \
                     (matches['threefold'] * 40) + \
                     (matches['codon'] * 10) + \
                     (matches['dna'] * 5) + \
                     (matches['physiology'] * 15) + \
                     (matches['pattern'] * 3)
            
            if weight >= 30:
                orig_text = page.get_text("text")
                interesting_pages[page_num] = {
                    'weight': weight,
                    'matches': matches,
                    'text': orig_text
                }

    sorted_pages = sorted(interesting_pages.items(), key=lambda x: x[1]['weight'], reverse=True)

    output_file = r"C:\Users\Kzaka\Documents\GitHub\HDM_API\tmp\esoteric_extraction.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        for page_num, data in sorted_pages[:40]:
            f.write(f"=========================================================\n")
            f.write(f"--- PAGE {page_num + 1} ---\n")
            f.write(f"Weight: {data['weight']} | Matches: {data['matches']}\n\n")
            f.write(data['text'] + "\n\n")

    print(f"Extraction complete. Wrote {min(40, len(sorted_pages))} highly esoteric pages to {output_file}.")

except Exception as e:
    print(f"Error parsing PDF: {e}")

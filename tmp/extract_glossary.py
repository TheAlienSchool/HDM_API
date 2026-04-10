import fitz

file_path = r"C:\Users\Kzaka\Dropbox\TSK\THE ALIEN SCHOOL\HDM_2025\Open Richard_Rudd-_Gene_Keys_Unlocking_The_Hi.pdf"

try:
    doc = fitz.open(file_path)
    glossary_pages = []
    in_glossary = False
    
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        upper_text = text.upper()
        
        if "GLOSSARY OF EMPOWERMENT" in upper_text and "GLOSSARY" in upper_text[:300]:
            in_glossary = True
            
        if in_glossary:
            glossary_pages.append((page_num, text))
            
            # The Glossary typically ends when we hit an Index, Acknowledgments, or About the Author
            if "INDEX" in upper_text and len(glossary_pages) > 5:
                break
            # Or if we've gone on too long (safety valve, glossary is usually ~20-30 pages)
            if len(glossary_pages) > 40:
                break

    output_file = r"C:\Users\Kzaka\Documents\GitHub\HDM_API\tmp\glossary_extraction.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        for pnum, content in glossary_pages:
            f.write(f"--- GLOSSARY PAGE {pnum + 1} ---\n")
            f.write(content + "\n\n")
            
    print(f"Glossary extraction complete: Saved {len(glossary_pages)} pages to {output_file}.")

except Exception as e:
    print(f"Error extracting glossary: {e}")

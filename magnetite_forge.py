import os
import json
import logging
from pathlib import Path
from supabase import create_client, Client
from google import genai
from google.genai import types

# =========================================================================
# THE MåGNETite FORGE: Gemini Intelligence Protocol
# This script extracts PDFs/Markdown, feeds them to Google Gemini to 
# synthesize the pedagogical components, and pushes them to Supabase.
# =========================================================================

# 1. LOAD KEYS FROM ENVIRONMENT (never hardcode — use a .env file locally)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # python-dotenv not installed; rely on actual environment variables

SUPABASE_URL   = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY   = os.getenv("SUPABASE_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY]):
    raise EnvironmentError(
        "Missing required environment variables. "
        "Copy .env.example → .env and fill in your keys."
    )

# Initialize Clients
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
ai_client = genai.Client(api_key=GEMINI_API_KEY)

# The Architectural Folders
TARGET_DIRECTORIES = [
    r"magnetism",
    r"assets\love mathematics",
    r"assets\creation"
]

def extract_text_from_file(file_path):
    ext = file_path.suffix.lower()
    if ext in ['.md', '.txt']:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    elif ext == '.pdf':
        try:
            import PyPDF2
            text = ""
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text += page.extract_text() + "\n"
            return text
        except ImportError:
            return "INSTALL PYPDF2: Run 'pip install PyPDF2' manually to read PDFs."
    return None

def archive_with_gemini(filename, raw_text):
    """Passes the raw text to Gemini to synthesize the pedagogical components."""
    prompt = f"""
    You are The KzA Writer's Room: a multi-disciplinary resonance field operating on the principle of the "Union of Rock and Ocean". 
    You are tasked with forging Cognitive Masonry from raw text. Your absolute mandate is to translate abstract, conceptual ideas into grounded, visceral, heuristic truths.
    
    CRITICAL RULE FOR THE GRIOT: You are STRICTLY FORBIDDEN from using disempathetic generalisms, elitist phrasing, or AI academic slop. Never write phrases like "Reality is understood as a multidimensional field." Do not presume the reader has a PhD in the void. You must build the bridge. Speak in visceral, elemental, and physical metaphors. Be inviting, warm, and unapologetically grounded. 
    
    Analyze the following text and categorize it according to the MåGNETite Drawers Taxonomy.
    Extract the core "Mechanical Seed" (the irreducible, load-bearing truth).
    Generate the "Visceral Translation" (a deeply human, accessible synthesis that feels like it was whispered by a poet-scientist).
    
    Return pure JSON with these exact keys:
    {{
       "magnet_tier": "Octave X",
       "category": "Essay / Framework / Formula",
       "title": "A beautiful, evocative Title derived from text",
       "opportunity": "1 concise sentence defining the opportunity.",
       "creative_context": "2 sentences of pure illumination highlighting the theory and core idea.",
       "blindspot": "1 sentence exposing the hidden trap, ignorance, or friction.",
       "integration": "1 actionable sentence defining the ancient recipe, formula, or practice to embody this."
    }}

    Filename: {filename}
    Text:
    {raw_text[:25000]}
    """
    
    response = ai_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )
    
    return json.loads(response.text)

def sweep_and_forge():
    print(f"Igniting the Gemini MåGNETite Forge...")
    
    for directory in TARGET_DIRECTORIES:
        dir_path = Path(directory)
        if not dir_path.exists():
            print(f"[SKIP] Directory {directory} not found.")
            continue
            
        print(f"\n:: Scanning Sector: {directory} ::")
        for file_path in dir_path.glob('*'):
            if file_path.suffix.lower() in ['.md', '.txt', '.pdf']:
                print(f"  -> Reading {file_path.name}...")
                raw_text = extract_text_from_file(file_path)
                
                if not raw_text or len(raw_text.strip()) < 50:
                    continue
                    
                print(f"     Synthesizing Taxonomy via Gemini...")
                try:
                    archival_data = archive_with_gemini(file_path.name, raw_text)
                    
                    # Construct Database Payload
                    payload = {
                        "title": archival_data.get("title", file_path.stem),
                        "magnet_tier": archival_data.get("magnet_tier", "Base"),
                        "category": archival_data.get("category", "Uncategorized"),
                        "content": f"The Opportunity :: {archival_data.get('opportunity', '')}\nThe Creative Context :: {archival_data.get('creative_context', '')}\nThe Blindspot :: {archival_data.get('blindspot', '')}\nThe Integration :: {archival_data.get('integration', '')}",
                    }
                    
                    # Push to Supabase
                    res = supabase.table("magnetic_insights").insert(payload).execute()
                    print(f"     [SUCCESS] MåGNET Forged: {payload['title']}")
                    
                except Exception as e:
                    print(f"     [ERROR] Failed to forge {file_path.name}: {e}")

if __name__ == "__main__":
    sweep_and_forge()

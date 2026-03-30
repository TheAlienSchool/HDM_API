import json

def generate_markdown():
    with open('/home/ubuntu/bloom_dodecahedron_wide_research.json', 'r') as f:
        data = json.load(f)
    
    results = data.get('results', [])
    
    markdown_content = "# The Dodecahedral Bloom: A Foundation for Humanity's Maturation\n\n"
    markdown_content += "## Introduction\n\n"
    markdown_content += "\"Consider how much time we get to Bloom. It can only be counted in dodecahedrons.\" — KzA\n\n"
    markdown_content += "This document synthesizes a wide parallel research exploration into the philosophical, symbolic, civilizational, and practical dimensions of the \"Bloom / Dodecahedron / Humanity\" concept. It serves as a foundational layer for an emerging book, manual, or textbook, structured around the Dodecahedral Humanities Model.\n\n"
    markdown_content += "---\n\n"
    
    for i, item in enumerate(results):
        output = item.get('output', {})
        if not output:
            continue
            
        title = output.get('dimension_title', f"Dimension {i+1}")
        overview = output.get('conceptual_overview', '')
        thinkers = output.get('key_thinkers_and_traditions', '')
        insights = output.get('profound_insights_and_tensions', '')
        connection = output.get('connection_to_bloom_concept', '')
        angles = output.get('book_angles', '')
        
        markdown_content += f"## {title}\n\n"
        markdown_content += f"### Conceptual Overview\n\n{overview}\n\n"
        markdown_content += f"### Key Thinkers, Traditions, and Texts\n\n{thinkers}\n\n"
        markdown_content += f"### Profound Insights and Productive Tensions\n\n{insights}\n\n"
        markdown_content += f"### Connection to the Bloom/Dodecahedron/Humanity Concept\n\n{connection}\n\n"
        markdown_content += f"### Potential Book and Chapter Angles\n\n{angles}\n\n"
        markdown_content += "---\n\n"
        
    with open('/home/ubuntu/Dodecahedral_Bloom_Exploration.md', 'w') as f:
        f.write(markdown_content)

if __name__ == "__main__":
    generate_markdown()

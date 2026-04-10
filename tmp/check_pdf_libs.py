import sys

def check_libs():
    try:
        import fitz
        print("PyMuPDF (fitz) is available.")
        sys.exit(0)
    except ImportError:
        pass
        
    try:
        import PyPDF2
        print("PyPDF2 is available.")
        sys.exit(0)
    except ImportError:
        pass
    
    print("No pdf library found.")
    sys.exit(1)

if __name__ == "__main__":
    check_libs()

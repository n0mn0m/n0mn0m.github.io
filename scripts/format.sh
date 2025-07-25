#!/usr/bin/env bash
# Format markdown files with mdformat

set -eou pipefail

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a virtual environment for Python tools
check_venv() {
    if [[ -z "${VIRTUAL_ENV:-}" && -d ".venv" ]]; then
        print_warning "Virtual environment not activated. Trying to activate .venv..."
        # shellcheck disable=SC1091
        source .venv/bin/activate || {
            print_error "Failed to activate .venv. Please activate it manually."
            exit 1
        }
    fi
}

# Install mdformat if not available
install_mdformat() {
    if ! command -v mdformat &> /dev/null; then
        print_status "Installing mdformat..."
        pip install mdformat mdformat-gfm mdformat-frontmatter
    fi
}

# Format Markdown files
format_markdown() {
    print_status "Formatting all Markdown files with mdformat..."
    if command -v mdformat &> /dev/null; then
        # Find and format all markdown files in the repository
        find . -name "*.md" -not -path "./.venv/*" -not -path "./node_modules/*" -not -path "./.pytest_cache/*" | while read -r file; do
            print_status "Formatting $file"
            mdformat "$file" || print_warning "Could not format $file"
        done
    else
        print_warning "mdformat not found. Installing..."
        install_mdformat
        format_markdown
    fi
}

# Main function
main() {
    local action="${1:-format}"

    print_status "Starting markdown formatting..."

    case "$action" in
        "format"|"")
            check_venv
            install_mdformat
            format_markdown
            ;;
        "check")
            print_status "Checking markdown formatting (dry run)..."
            check_venv
            install_mdformat
            if command -v mdformat &> /dev/null; then
                find . -name "*.md" -not -path "./.venv/*" -not -path "./node_modules/*" -not -path "./.pytest_cache/*" | while read -r file; do
                    print_status "Checking $file"
                    mdformat --check "$file" || print_warning "$file needs formatting"
                done
            fi
            ;;
        "help"|"-h"|"--help")
            echo "Usage: $0 [option]"
            echo ""
            echo "Markdown formatting script using mdformat"
            echo ""
            echo "Options:"
            echo "  format     Format markdown files (default)"
            echo "  check      Check formatting without making changes"
            echo "  help       Show this help message"
            echo ""
            echo "Files formatted:"
            echo "  - All *.md files in the repository"
            echo "  - Excludes .venv/ and node_modules/ directories"
            echo ""
            echo "Note: All markdown files get the same formatting treatment"
            exit 0
            ;;
        *)
            print_error "Unknown option: $action"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac

    print_status "Markdown formatting complete! ✨"
}

main "$@"

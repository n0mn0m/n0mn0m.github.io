#!/usr/bin/env bash
# Format markdown files with uvx and mdformat

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

require_uvx() {
    if ! command -v uvx &> /dev/null; then
        print_error "uvx not found. Install uv to run the formatter."
        exit 1
    fi
}

run_mdformat() {
    uvx \
        --from mdformat==0.7.22 \
        --with mdformat-gfm \
        --with mdformat-frontmatter \
        mdformat "$@"
}

# Format Markdown files
format_markdown() {
    print_status "Formatting all Markdown files with uvx and mdformat..."
    # Find and format all markdown files in the repository
    find . -name "*.md" -not -path "./.venv/*" -not -path "./node_modules/*" -not -path "./.pytest_cache/*" | while read -r file; do
        print_status "Formatting $file"
        run_mdformat "$file" || print_warning "Could not format $file"
    done
}

# Main function
main() {
    local action="${1:-format}"

    print_status "Starting markdown formatting..."

    case "$action" in
        "format"|"")
            require_uvx
            format_markdown
            ;;
        "check")
            print_status "Checking markdown formatting (dry run)..."
            require_uvx
            find . -name "*.md" -not -path "./.venv/*" -not -path "./node_modules/*" -not -path "./.pytest_cache/*" | while read -r file; do
                print_status "Checking $file"
                run_mdformat --check "$file" || print_warning "$file needs formatting"
            done
            ;;
        "help"|"-h"|"--help")
            echo "Usage: $0 [option]"
            echo ""
            echo "Markdown formatting script using uvx and mdformat"
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
            echo "Note: mdformat and its plugins are managed by uvx"
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

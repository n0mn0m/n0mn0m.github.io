"""Command-line interface."""

import argparse
import os
import sys
from pathlib import Path

from minigen.config import Config
from minigen.builder import Builder
from minigen.logger import logger
from minigen.server import Server


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="minigen static site generator")
    parser.add_argument(
        "command",
        choices=["build", "serve", "clean", "feeds"],
        help="Command to execute",
    )
    parser.add_argument(
        "-c",
        "--config",
        default="config.toml",
        help="Path to config file (default: config.toml)",
    )

    args = parser.parse_args()

    # Find config file
    config_path = Path(os.getcwd()) / args.config
    if not config_path.exists():
        logger.error(f"Could not find {args.config} in {os.getcwd()}")
        sys.exit(1)

    # Load config
    config = Config.from_file(config_path)

    # Initialize builder
    builder = Builder(config)

    # Process command
    command = args.command

    if command == "build":
        builder.build()
    elif command == "serve":
        # Build first
        builder.build()
        # Then serve
        server = Server(config.output_dir)
        try:
            server.serve()
        except KeyboardInterrupt:
            server.shutdown()
    elif command == "clean":
        builder.clean()
    elif command == "feeds":
        # Check feed configuration first
        validation = config.validate_feed_config()
        if not validation.is_valid:
            logger.error(f"Feed configuration error: {validation.error_message}")
            logger.error(
                "Please update your config.toml with the required feed settings:"
            )
            logger.error("  - site_title")
            logger.error("  - site_description")
            logger.error("  - site_url")
            logger.error("  - site_author")
            sys.exit(1)

        builder.load_posts()
        builder.generate_feeds()
    else:
        logger.error(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()

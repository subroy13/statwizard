#!/usr/bin/env python3
"""
image_converter.py

Finds base64-encoded images embedded in .qmd files, saves them as real image
files under static/images/<qmd-relative-path>/, and rewrites the .qmd file
with a relative Markdown image link.

Usage:
    python scripts/image_converter.py                     # all .qmd files
    python scripts/image_converter.py notes/concepts/x.qmd  # specific file(s)
    python scripts/image_converter.py --dry-run           # preview, no writes
"""

import argparse
import base64
import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
STATIC_IMAGES = PROJECT_ROOT / "static" / "images"

# Matches ![alt](data:image/TYPE;base64,DATA)  — data may span a single long line
_BASE64_RE = re.compile(
    r'!\[([^\]]*)\]\(data:image/([^;]+);base64,([A-Za-z0-9+/=\s]+?)\)',
    re.DOTALL,
)

_MIME_TO_EXT = {
    "png":     "png",
    "jpeg":    "jpg",
    "jpg":     "jpg",
    "gif":     "gif",
    "webp":    "webp",
    "bmp":     "bmp",
    "svg+xml": "svg",
}

# Directories to skip when globbing
_SKIP_DIRS = {"docs", "_site", ".quarto", ".git", "scripts"}


def _ext_for(mime_subtype: str) -> str:
    return _MIME_TO_EXT.get(mime_subtype.lower(), mime_subtype.lower())


def _img_dir(qmd_path: Path) -> Path:
    """static/images/<path/of/qmd/without/extension>/"""
    rel = qmd_path.relative_to(PROJECT_ROOT)
    return STATIC_IMAGES / rel.with_suffix("")


def _rel_link(qmd_path: Path, img_path: Path) -> str:
    """Relative path from the .qmd file's directory to the image file."""
    return Path(os.path.relpath(img_path, qmd_path.parent)).as_posix()


def _next_available(img_dir: Path, stem: str, ext: str) -> Path:
    """Return img_dir/stem.ext, appending _2, _3, … if it already exists."""
    candidate = img_dir / f"{stem}.{ext}"
    n = 2
    while candidate.exists():
        candidate = img_dir / f"{stem}_{n}.{ext}"
        n += 1
    return candidate


def process_file(qmd_path: Path, dry_run: bool = False) -> int:
    text = qmd_path.read_text(encoding="utf-8")
    matches = list(_BASE64_RE.finditer(text))
    if not matches:
        return 0

    img_dir = _img_dir(qmd_path)
    plan: list[tuple] = []  # (match, alt, ext, img_path, raw_b64)

    for i, m in enumerate(matches, 1):
        alt, mime, raw_b64 = m.group(1), m.group(2).strip().lower(), m.group(3)
        ext = _ext_for(mime)
        img_path = _next_available(img_dir, f"image_{i:03d}", ext)
        plan.append((m, alt, ext, img_path, raw_b64))

    label = qmd_path.relative_to(PROJECT_ROOT)
    print(f"\n{label}  —  {len(plan)} image(s)")

    if dry_run:
        for _, alt, ext, img_path, _ in plan:
            rel = _rel_link(qmd_path, img_path)
            print(f"  → would save  {img_path.relative_to(PROJECT_ROOT)}")
            print(f"    would write  ![{alt}]({rel})")
        return len(plan)

    img_dir.mkdir(parents=True, exist_ok=True)

    # Replace from last match to first so string offsets stay valid
    updated = text
    for m, alt, ext, img_path, raw_b64 in reversed(plan):
        raw_bytes = base64.b64decode(re.sub(r"\s+", "", raw_b64))
        img_path.write_bytes(raw_bytes)
        rel = _rel_link(qmd_path, img_path)
        replacement = f"![{alt}]({rel})"
        updated = updated[: m.start()] + replacement + updated[m.end() :]
        print(f"  saved  {img_path.relative_to(PROJECT_ROOT)}")

    qmd_path.write_text(updated, encoding="utf-8")
    print(f"  updated {label}")
    return len(plan)


def collect_qmd_files() -> list[Path]:
    files = []
    for p in sorted(PROJECT_ROOT.rglob("*.qmd")):
        if not any(part in _SKIP_DIRS for part in p.parts):
            files.append(p)
    return files


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract base64 images from .qmd files and replace with file links."
    )
    parser.add_argument(
        "files",
        nargs="*",
        metavar="FILE",
        help="Specific .qmd files to process (default: all .qmd files in project)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would happen without writing any files",
    )
    args = parser.parse_args()

    qmd_files = (
        [Path(f).resolve() for f in args.files] if args.files else collect_qmd_files()
    )

    if not qmd_files:
        print("No .qmd files found.")
        sys.exit(0)

    total = sum(process_file(f, dry_run=args.dry_run) for f in qmd_files)
    verb = "would extract" if args.dry_run else "extracted"
    print(f"\nDone. {total} image(s) {verb}.")


if __name__ == "__main__":
    main()

#!/bin/bash

# Replace with the path to your Markdown file
MARKDOWN_FILE="readme.md"

# Use awk to find all the section headers in the Markdown file
# Assumes that headers are marked with one or more "#" characters
# and that the header text is on the same line
HEADERS=$(awk -F'#+' '/^#/ { print $0 }' $MARKDOWN_FILE)

# Loop through the headers and generate a table of contents
echo "Table of Contents:"
echo ""

while read -r line; do
  # Extract the header level and text from the header line
  header_level=$(echo "$line" | awk -F'#+' '{ print length($2) }')
  header_text=$(echo "$line" | sed 's/^#\+ //' | tr '[:lower:]' '[:upper:]')

  # Indent the header based on its level
  indent=""
  for i in $(seq 1 $header_level); do
    indent+="  "
  done

  # Print the header and its indentation
  echo "$indent- [$header_text]($MARKDOWN_FILE#$(echo $header_text | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | tr ' ' '-'))"
done <<< "$HEADERS"

echo ""
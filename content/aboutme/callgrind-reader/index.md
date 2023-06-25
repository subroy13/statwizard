---
title: callgrind-reader - Typescript Package
date: "2023-04-18T00:00:00Z"
type: software
imageCaption: ""
summary: An npm package written in typescript to parse callgrind like files and extract profiling metrics from code
tags:
    - System Architecture Design
links:
    - name: Github Repository
      icon: fab fa-github
      link: "https://github.com/subroy13/callgrind-reader"
      color: neutral

    - name: NPM
      icon: fa-brands fa-npm
      link: "https://www.npmjs.com/package/callgrind-reader"
      color: red

    - name: Documentation
      icon: fas fa-book
      link: "https://subroy.statwizard.in/callgrind-reader/"
      color: yellow

---

# Callgrind Reader

The "callgrind-reader" package is a Node.js library for parsing and analyzing profiling information from callgrind and cachegrind files. With this library, you can easily extract useful insights from your profiling data, such as total cycles, instructions, and flops. This package is useful for developers who need to optimize their code and want to identify which functions are taking the most time or resources.

The package [`callgrind-reader`](https://www.npmjs.com/package/callgrind-reader) is available to download in `npm`.

![npm](https://img.shields.io/npm/dm/callgrind-reader)

## Features

- Parses callgrind and cachegrind files to extract profiling data
- Calculates and reports total cycles, instructions, and flops
- Provides a simple and easy-to-use API for accessing profiling data
- Written in TypeScript for type-safe code and easy integration with TypeScript projects
- Lightweight and fast, with no external dependencies
- Identifies the functions that are taking the most time or resources

## Installation

To install "callgrind-reader", simply run:

```
npm install callgrind-reader
```

## Usage 

Here's a basic example of how to use "callgrind-reader" to parse a callgrind file and extract profiling data:

```
import { CallGrind } from 'callgrind-reader';

// Parse the callgrind file using CallgrindReader
const reader = new CallGrind('path/to/callgrind/file');
const result = reader.parse(contents);

// Access the profiling data
for (const item of result.profile) {
    console.log(`Function: ${item.functionName}`);
    console.log(`Total cycles: ${item.events.cycles}`);
    console.log(`Total instructions: ${item.events.instructions}`);
    console.log(`Total flops: ${item.events.flops}`);
}
```

For more detailed information on how to use "callgrind-reader", see the [documentation](https://subroy13.github.io/callgrind-reader/).

## Contribution

Contributions to "callgrind-reader" are welcome! If you encounter a bug or want to add a new feature, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/subroy13/callgrind-reader).

## License

"callgrind-reader" is released under the [MIT License](https://github.com/subroy13/callgrind-reader/blob/master/LICENSE).

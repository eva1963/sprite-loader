# run-loader

Run a webpack loader (or chain of loaders) from the command line.

## Installation

```bash
yarn global add run-loader
```

## Usage

```bash
mkdir foo
cd foo
yarn add style-loader
echo "div { color: red }" > asdf.css
run-loader loader [another-loader [yet-another-loader [...]]] file
```

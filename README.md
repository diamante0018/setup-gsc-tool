This action downloads and installs [gsc-tool][gsc-tool-link].

# Usage

Just add the following lines to the `steps:` list in your GitHub Action YAML file:

```yaml
- uses: diamante0018/setup-gsc-tool@main
  with:
    version: "1.2.0"
```

There are no plans to support earlier versions of gsc-tool.

By default, gsc-tool is installed in `.gsc-tool` directory relative to the GitHub workspace.
You can optionally change it using the `path` input.

[gsc-tool-link]:     https://github.com/xensik/gsc-tool

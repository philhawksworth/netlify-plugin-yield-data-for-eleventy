# netlify-plugin-yield-data-for-eleventy

A Netlify plugin to expose data collected to in the Netlify build cache to place and structure that [Eleventy](https://11ty.io) can use

> NOTICE: This is an experimental feature. Subject to lots of change.

## Overview

This plugin exposes data files gathered by previous operations into the Netlify build cache and exposes them to a destinations and format suitable for the Eleventy SSG to use in its temapltes at site generation time.

## Demonstration

See this plugin being used with a plugin which gathers RSS feed data in this simplified demo site: https://demo-plugin-fetch-feed.netlify.com


## Usage

This plugin is designed to be used in conjunction with other plugins which first gather content from remote sources and collect it in the Netlify build cache, such as [netlify-plugin-fetch-feeds](https://github.com/philhawksworth/netlify-plugin-fetch-feeds).



### Prerequisites

- npm and node
- @Netlify/build (later this will be included in the Netlify CLI)
- A free [Netlify account](https://netlify.com)
- Opt-in to Netlify Build Plugin feature support (Not yet publicly available, sorry)


### Including this plugin in a project

This plugin can be included via npm. Install it as a dependency for your project like so:

```
npm install --save netlify-plugin-yield-data-for-eleventy
```

### Configuration

TODO

To use plugins, a `plugins` array should be specified in your `netlify.yml`. Each plugin can then be specified with its parameters like so:

```yaml
plugins:
  - netlify-plugin-yield-data-for-eleventy:
      data_dir: src/site/_data # path to where data files should be copied
      cache_sources: # An array of folders within the netlify cache where data should be sourced
        - netlify-plugin-fetch-feeds
```

### Execution in Netlify

Once installed and configured, the plugin will automatically run in the Netlify CI during its specified Netlify Build lifecycle event.

### Executing locally

To test the execution of the Netlify Build lifecycle locally, first ensure that netlify-build is installed:

```bash
# Ensure that you have the netlify build command available
# (in future this will be provided via the CLI)
npm install @netlify/build -g

# In the project working directory, run the build as netlify would with the build bot
netlify-build
```

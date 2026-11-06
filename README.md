# WinFix Kit website

Static, responsive English landing page for WinFix Kit. No external runtime, analytics, cookies or build dependencies.

Published URL: https://drakkenworld.github.io/winfix-kit-site/

## Validation and deployment

Run `node tests/check-site.mjs` (Node.js 20 or newer) to check local assets, fragment links, metadata, release link and license. This does not test remote HTTP links or visual layout.

GitHub Actions validates every push and pull request. Pushes to `main` deploy only `index.html`, assets, robots.txt, sitemap.xml, LICENSE and .nojekyll. Repository metadata and tests are not published. All asset URLs are relative so the project subpath works.

The repository's **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**. The `github-pages` environment must allow `main`. The workflow needs `pages: write` and `id-token: write` only in the deployment job. After changing the Pages source, rerun the workflow from Actions if needed. A green deployment and a reachable public URL are required to confirm publication; source changes alone are not deployment evidence.

## Content

Disk Space Analyzer links to its stable GitHub Release and source. Other utilities are explicitly planned. Update the version badge when releasing a new analyzer version. There are no donation or account placeholders to configure.

Website code: [MIT license](LICENSE).

## Languages and voluntary support

English is at `/winfix-kit-site/` and French at `/winfix-kit-site/fr/`. A visible language selector works without JavaScript, cookies or automatic redirects. Both pages have canonical and hreflang metadata and appear in the sitemap. The deployment stages the French directory too.

Buy Me a Coffee is a single secondary link at the bottom of each page, pointing to https://buymeacoffee.com/drakken. There are no third-party widgets, popups or repeated prompts, and downloads remain directly accessible. The text explicitly says support is optional.

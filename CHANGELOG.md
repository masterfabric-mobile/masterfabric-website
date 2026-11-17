# Changelog

All notable changes to masterfabric.co are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-11-17

### Added

- Site version and commit in the footer, read from `package.json` at build time, linking to this changelog.
- `/changelog` page rendered from `CHANGELOG.md` at build time.
- Per-app privacy policies with a general privacy notice and versioned policy history under `/privacy/` ([#21](https://github.com/masterfabric-mobile/masterfabric-website/pull/21)).
- Privacy policies for MasterFabric Notch, Cubeliora, Document Scan Plus, Idle Mine Tycoon, Arx Hero and Ayso ([#23](https://github.com/masterfabric-mobile/masterfabric-website/pull/23)).
- Privacy policies for Cannon Merge Plus, Farm Merge Valley, Flex, Foxie, Hole Rush Plus and MF Studio, with the full reviewed policy texts ([#24](https://github.com/masterfabric-mobile/masterfabric-website/pull/24)).
- Interactive iPhone 17 demo for the app optimization section.
- Blog posts listed in the sitemap.

### Changed

- App privacy policy URLs use the bundle ID: `/privacy/<bundleId>/` ([#22](https://github.com/masterfabric-mobile/masterfabric-website/pull/22)).
- Privacy policy text polished; the app switcher and app version were removed from the policy page ([#22](https://github.com/masterfabric-mobile/masterfabric-website/pull/22)).
- Bundle IDs for Cubeliora, Ayso and Stack Tower follow the `com.masterfabric.*` scheme ([#24](https://github.com/masterfabric-mobile/masterfabric-website/pull/24)).
- Cookie banner and Claude Partner popup are hidden on privacy pages ([#24](https://github.com/masterfabric-mobile/masterfabric-website/pull/24)).
- Redesigned the Claude Partner section, the About page and the blog; blog posts are Markdown files with category filter, grid/list views and a read mode.

### Removed

- The old `/privacy/stacktowerplus/` URL ([#22](https://github.com/masterfabric-mobile/masterfabric-website/pull/22)).

## [1.5.0] - 2026-10-29

### Added

- Claude Partner Network on the home page and in the footer, with a meeting request through the contact form.
- Site version read from `package.json`.

### Changed

- Next.js and `eslint-config-next` upgraded to 14.2.35, with `npm audit fix` and a `postcss` override ([#19](https://github.com/masterfabric-mobile/masterfabric-website/pull/19)).
- Outdated 2024 blog posts removed from the blog front ([#20](https://github.com/masterfabric-mobile/masterfabric-website/pull/20)).

### Security

- Security headers in `vercel.json`: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and Cross-Origin-Opener-Policy ([#19](https://github.com/masterfabric-mobile/masterfabric-website/pull/19)).

## [1.2.0] - 2026-10-29

### Changed

- Office and legal copy use the Altındağ / Ankara address ([#18](https://github.com/masterfabric-mobile/masterfabric-website/pull/18)).
- Services page compares Classic SDLC with AI-SDLC in tabs ([#18](https://github.com/masterfabric-mobile/masterfabric-website/pull/18)).
- Careers page shows hiring status from `positions.json` instead of placeholder openings ([#18](https://github.com/masterfabric-mobile/masterfabric-website/pull/18)).

### Removed

- Unused About timeline and statistics ([#18](https://github.com/masterfabric-mobile/masterfabric-website/pull/18)).

[1.6.0]: https://github.com/masterfabric-mobile/masterfabric-website/compare/3f47b02...v1.6.0
[1.5.0]: https://github.com/masterfabric-mobile/masterfabric-website/commit/3f47b02
[1.2.0]: https://github.com/masterfabric-mobile/masterfabric-website/pull/18

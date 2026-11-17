import fs from 'fs'
import path from 'path'

export type ChangelogSection = { title: string; items: string[] }

export type ChangelogRelease = {
  version: string
  date: string
  sections: ChangelogSection[]
}

const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md')

/**
 * Parses CHANGELOG.md (Keep a Changelog format) at build time.
 * Supports `## [x.y.z] - YYYY-MM-DD`, `### Section` and `- item` lines.
 */
export function getChangelog(): ChangelogRelease[] {
  const raw = fs.readFileSync(CHANGELOG_PATH, 'utf8')
  const releases: ChangelogRelease[] = []
  let release: ChangelogRelease | null = null
  let section: ChangelogSection | null = null

  for (const line of raw.split('\n')) {
    const releaseMatch = line.match(/^## \[([^\]]+)\](?:\s*-\s*(\S+))?/)
    if (releaseMatch) {
      release = { version: releaseMatch[1], date: releaseMatch[2] || '', sections: [] }
      releases.push(release)
      section = null
      continue
    }
    const sectionMatch = line.match(/^### (.+)$/)
    if (sectionMatch && release) {
      section = { title: sectionMatch[1].trim(), items: [] }
      release.sections.push(section)
      continue
    }
    const itemMatch = line.match(/^[-*] (.+)$/)
    if (itemMatch && section) {
      section.items.push(itemMatch[1].trim())
      continue
    }
    // Continuation line of a wrapped list item.
    if (section && section.items.length && /^\s{2,}\S/.test(line)) {
      section.items[section.items.length - 1] += ` ${line.trim()}`
    }
  }

  return releases
}

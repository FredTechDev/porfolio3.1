import { profile, skillGroups, experiences, education, achievements } from '../src/data/site.js'
import { projects, otherProjects } from '../src/data/projects.js'

// Keeps the prompt small enough to stay cheap while still covering every
// project, so answers match what the site actually claims.
const MAX_CHARS = 9000

export function portfolioBrief() {
  const lines = []

  lines.push(`Name: ${profile.name}`)
  lines.push(`Role: ${profile.role}`)
  lines.push(`Location: ${profile.location}`)
  lines.push(`Summary: ${profile.tagline}`)
  lines.push('')

  lines.push('Education:')
  lines.push(
    `- ${education.school} (${education.shortSchool}) — ${education.qualification}${education.period ? ` (${education.period})` : ` (${education.status})`}`,
  )
  lines.push('')

  lines.push('Experience:')
  for (const e of experiences) {
    lines.push(`- ${e.role} at ${e.org} (${e.period})`)
    for (const p of e.points) lines.push(`  - ${p}`)
  }
  lines.push('')

  lines.push('Skills:')
  for (const g of skillGroups) lines.push(`- ${g.category}: ${g.items.join(', ')}`)
  lines.push('')

  lines.push('Featured projects (full case studies):')
  for (const p of projects) {
    lines.push(`- ${p.name} [${p.status}]`)
    lines.push(`  Summary: ${p.summary}`)
    lines.push(`  Problem: ${p.problem}`)
    lines.push(`  Stack: ${p.stack.join(', ')}`)
    if (p.caseStudy?.solution) lines.push(`  Approach: ${p.caseStudy.solution}`)
    if (p.live) lines.push(`  Live: ${p.live}`)
    if (p.repo) lines.push(`  Source: ${p.repo}`)
  }
  lines.push('')

  lines.push('Other work:')
  for (const group of otherProjects) {
    for (const item of group.items) {
      lines.push(`- ${item.name} (${group.category}) — ${item.description} Stack: ${item.stack.join(', ')}`)
    }
  }
  lines.push('')

  lines.push('Achievements:')
  for (const a of achievements) lines.push(`- ${a.title}: ${a.detail}`)

  const brief = lines.join('\n')
  return brief.length > MAX_CHARS ? brief.slice(0, MAX_CHARS) : brief
}

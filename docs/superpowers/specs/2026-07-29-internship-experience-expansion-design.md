# Internship Experience Expansion

## Goal

Make the homepage identify professional internships explicitly and restore the missing SUU–Wuhan Polytechnic University teaching-assistant experience. The section remains compact and evidence-led, consistent with the site's index-first structure.

## Approved Structure

Rename the homepage navigation label from `Experience` to `Internships` in English and from `工作经历` to `实习经历` in Chinese. Rename the section heading to `Internship Experience` / `实习经历`.

The section contains two entries, ordered by recency:

1. Vertex Marketing — Reddit Community Operations Intern
2. Southern Utah University × Wuhan Polytechnic University — English Writing Teaching Assistant

Both entries use the same restrained row system. Vertex retains its existing evidence and link to the detailed case page. The teaching-assistant entry remains a concise homepage item and does not receive a separate detail page.

## Teaching-Assistant Content

English display copy:

> **Southern Utah University × Wuhan Polytechnic University**
>
> *English Writing Teaching Assistant · May 2026*
>
> Supported an SUU instructor in English writing courses serving 200+ students in Wuhan. Provided bilingual classroom support, managed attendance and assignment grading, delivered written feedback, and organized final-grade data and course completion reporting in Excel.

Chinese display copy:

> **南犹他大学 × 武汉轻工大学**
>
> *英语写作课程助教 · 2026 年 5 月*
>
> 在武汉协助 SUU 教师为 200 多名学生开展英语写作课程，提供中英双语课堂支持；负责考勤、作业评分与书面反馈，并使用 Excel 整理期末成绩和课程完成情况。

The date is deliberately shown as `May 2026` / `2026 年 5 月`, resolving inconsistent date ranges across older resumes without implying unsupported precision.

## Evidence Boundaries

The entry may state only facts corroborated by the user's resume and local knowledge base:

- English writing courses served more than 200 students;
- bilingual classroom and faculty–student coordination;
- attendance management, assignment grading, and written feedback;
- Excel-based final-grade organization and course completion reporting.

Do not publish the instructor's name, compensation or travel arrangement, internal academic information, or unverified efficiency and accuracy improvements. Do not describe the role as independent course instruction.

## Layout and Interaction

The experience section should remain visually compact. Rows use consistent spacing, type hierarchy, dividers, and responsive behavior. Adding the second entry must not recreate a long-form case-study layout or introduce new metric cards.

On narrow screens, company, role, date, and description stack cleanly without compressed Chinese line height. Existing reveal motion and reduced-motion behavior remain intact. The Vertex detail link remains the only expansion control in this section.

## Internationalization

Both entries require complete selector coverage in `i18n.js`. English remains the default language on every fresh load. The language toggle must update the navigation label, section heading, organizations, roles, dates, descriptions, and any accessibility labels introduced by the change.

## Testing and Verification

Automated tests should verify:

1. the navigation and section use `Internships` / `Internship Experience` in English and `实习经历` in Chinese;
2. exactly two internship rows are present;
3. the teaching-assistant organization, role, `May 2026`, and `200+` evidence are present;
4. English and Chinese selector dictionaries remain in parity;
5. the existing Vertex evidence and detail-page link are preserved;
6. no unsupported teaching-assistant metrics or private details are introduced.

Manual verification covers desktop and mobile widths, language switching, readable Chinese spacing, keyboard navigation, motion, and unchanged artwork proportions.

## Files Expected to Change

- `index.html`
- `i18n.js`
- relevant tests under `tests/`

No new detail page, framework, dependency, or media asset is required.

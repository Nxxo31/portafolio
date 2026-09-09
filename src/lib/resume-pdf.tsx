import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'
import type { ResumeContent } from './resume-data'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1a1a2e',
    backgroundColor: '#f4f1e8',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a2e',
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: '#ff6b35',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9,
    color: '#1a1a2e',
  },
  contactItem: {
    marginBottom: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#ff6b35',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 3,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  experienceRole: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  experiencePeriod: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#666666',
  },
  experienceCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#666666',
    marginBottom: 4,
  },
  experienceDesc: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  experienceTech: {
    fontSize: 8,
    color: '#666666',
  },
  projectItem: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  projectRole: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#666666',
    marginBottom: 3,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 3,
  },
  projectStack: {
    fontSize: 8,
    color: '#666666',
  },
  skillsCategory: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginTop: 6,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    fontSize: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: '#1a1a2e',
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#999999',
    textAlign: 'center',
  },
  availability: {
    fontSize: 10,
    marginTop: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#00a6fb',
  },
  langList: {
    fontSize: 10,
    marginBottom: 12,
  },
})

export function ResumePDF({ content }: { content: ResumeContent }) {
  const { data: r, labels } = content
  const skillCategories = [...new Set(r.skills.map((s) => s.category))]

  return (
    <Document
      title={`${r.name} — CV`}
      author={r.name}
      subject="CV"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{r.name}</Text>
          <Text style={styles.jobTitle}>{r.jobTitle}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{r.location}</Text>
            <Text style={styles.contactItem}>
              {labels.email}: {r.email}
            </Text>
            <Link src={r.githubUrl} style={styles.contactItem}>
              {labels.github}: {r.githubUrl}
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
          <Text style={styles.summary}>{r.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.experience}</Text>
          {r.experience.map((e, i) => (
            <View key={i} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceRole}>{e.role}</Text>
                <Text style={styles.experiencePeriod}>{e.period}</Text>
              </View>
              <Text style={styles.experienceCompany}>{e.company}</Text>
              <Text style={styles.experienceDesc}>{e.description}</Text>
              <Text style={styles.experienceTech}>
                Tech: {e.technologies.join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.projects}</Text>
          {r.projects.slice(0, 4).map((p, i) => (
            <View key={i} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              <Text style={styles.projectRole}>
                Rol: {p.role}
                {p.impact ? ` · ${p.impact}` : ''}
              </Text>
              <Text style={styles.projectDesc}>{p.description}</Text>
              <Text style={styles.projectStack}>
                Stack: {p.stack.join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.skills}</Text>
          {skillCategories.map((cat) => {
            const skills = r.skills.filter((s) => s.category === cat)
            return (
              <View key={cat}>
                <Text style={styles.skillsCategory}>{cat}</Text>
                <View style={styles.skillsList}>
                  {skills.map((s) => (
                    <Text key={s.name} style={styles.skillTag}>
                      {s.name} ({s.yearsExperience}y)
                    </Text>
                  ))}
                </View>
              </View>
            )
          })}
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.languages}</Text>
          <Text style={styles.langList}>{r.languages.join(' · ')}</Text>
        </View>

        {/* Availability */}
        <Text style={styles.availability}>{r.availability}</Text>

        {/* Footer */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}

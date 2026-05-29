import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { CvData } from "@/lib/types";

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: "#1a1a1a", fontFamily: "Helvetica" },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#111" },
  title: { fontSize: 11, color: "#6366f1", marginTop: 2, fontFamily: "Helvetica-Bold" },
  contact: { fontSize: 9, color: "#555", marginTop: 6 },
  section: { marginTop: 16 },
  h2: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#6366f1",
    marginBottom: 6,
    borderBottom: "1px solid #ddd",
    paddingBottom: 3,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  item: { marginBottom: 8 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: "#666", fontSize: 9 },
  tag: { fontSize: 9, color: "#444", marginBottom: 2 },
});

function CvDoc({ cv }: { cv: CvData }) {
  return (
    <Document author={cv.identity.name} title={`CV ${cv.identity.name}`}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{cv.identity.name}</Text>
        <Text style={s.title}>{cv.identity.title}</Text>
        <Text style={s.contact}>
          {cv.contact.email} · {cv.contact.phone} · {cv.contact.address} · {cv.contact.linkedin}
        </Text>

        <View style={s.section}>
          <Text style={s.h2}>Profil</Text>
          <Text>{cv.profile}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Expériences</Text>
          {cv.experiences.map((e, i) => (
            <View key={i} style={s.item}>
              <View style={s.row}>
                <Text style={s.bold}>
                  {e.title} — {e.company}
                </Text>
                <Text style={s.muted}>{e.dates}</Text>
              </View>
              <Text style={s.muted}>{e.description}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Formations</Text>
          {cv.formations.map((f, i) => (
            <View key={i} style={s.row}>
              <Text>
                <Text style={s.bold}>{f.title}</Text> — {f.school}
              </Text>
              <Text style={s.muted}>{f.dates}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Compétences</Text>
          {Object.entries(cv.skills).map(([cat, list]) => (
            <Text key={cat} style={s.tag}>
              <Text style={s.bold}>{cat} : </Text>
              {list.map((sk) => `${sk.name} (${sk.level})`).join(", ")}
            </Text>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.h2}>Certifications</Text>
          {cv.certifications.map((c, i) => (
            <Text key={i} style={s.tag}>
              • {c}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function downloadCvPdf(cv: CvData) {
  const blob = await pdf(<CvDoc cv={cv} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CV-${cv.identity.name.replace(/\s+/g, "-")}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

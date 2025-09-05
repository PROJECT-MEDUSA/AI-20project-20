import { saveAs } from "file-saver";
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

export type ResumeData = {
  profile: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dob: string;
    maritalStatus: string;
    profession: string;
    address: string;
    nationality: string;
    passportNumber: string;
    phone: string;
    email: string;
  };
  experience: Array<{
    id: string; jobTitle: string; employer: string; city: string; state: string; startDate: string; endDate: string; current: boolean; responsibilities: string;
  }>;
  education: Array<{
    id: string; school: string; city: string; state: string; degree: string; fieldOfStudy: string; startDate: string; endDate: string; current: boolean;
  }>;
  skills: Array<{ id: string; name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert" }>;
  summary: string;
  interests: string[];
  media: { photoDataUrl: string; facebook: string; twitter: string; linkedin: string; website: string };
};

export async function exportDocx(data: ResumeData) {
  const fullName = [data.profile.firstName, data.profile.middleName, data.profile.lastName].filter(Boolean).join(" ");
  const contact = [data.profile.email, data.profile.phone, data.media.website || data.media.linkedin].filter(Boolean).join("  •  ");

  const children: Paragraph[] = [];
  children.push(new Paragraph({ text: fullName || "Your Name", heading: HeadingLevel.TITLE, spacing: { after: 200 } }));
  if (data.profile.profession) children.push(new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: data.profile.profession, bold: true })] }));
  if (contact) children.push(new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: contact, color: "555555" })] }));

  if (data.summary) {
    children.push(new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_2 }));
    children.push(...splitLines(data.summary).map((t) => new Paragraph({ text: t })));
  }

  if (data.experience.length) {
    children.push(new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_2 }));
    for (const e of data.experience) {
      const line = [e.jobTitle, e.employer].filter(Boolean).join(" — ");
      const dates = [e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" – ");
      const loc = [e.city, e.state].filter(Boolean).join(", ");
      if (line) children.push(new Paragraph({ text: line, spacing: { before: 120 } }));
      if (dates || loc) children.push(new Paragraph({ text: [dates, loc].filter(Boolean).join("  •  "), style: "subtle" } as any));
      const bullets = splitLines(e.responsibilities).filter(Boolean);
      bullets.forEach((b) => children.push(new Paragraph({ text: b, bullet: { level: 0 } })));
    }
  }

  if (data.education.length) {
    children.push(new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_2 }));
    for (const ed of data.education) {
      const line = [ed.degree, ed.fieldOfStudy].filter(Boolean).join(", ");
      const school = ed.school;
      const dates = [ed.startDate, ed.current ? "Present" : ed.endDate].filter(Boolean).join(" – ");
      if (school) children.push(new Paragraph({ text: school, spacing: { before: 120 } }));
      if (line) children.push(new Paragraph({ text: line }));
      if (dates) children.push(new Paragraph({ text: dates, style: "subtle" } as any));
    }
  }

  if (data.skills.length) {
    children.push(new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_2 }));
    const skills = data.skills.filter((s) => s.name).map((s) => s.name).join(", ");
    children.push(new Paragraph({ text: skills }));
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fullName || "resume"}.docx`);
}

export function makeShareUrl(data: ResumeData) {
  const json = JSON.stringify(data);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  const url = new URL(window.location.href);
  url.searchParams.set("r", b64);
  return url.toString();
}

function splitLines(s: string) {
  return s
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

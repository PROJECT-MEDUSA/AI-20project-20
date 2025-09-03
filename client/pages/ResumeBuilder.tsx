import { useEffect, useMemo, useRef, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  Heart,
  Link as LinkIcon,
  Save,
  User,
  Briefcase,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type ExperienceItem = {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
};

type EducationItem = {
  id: string;
  school: string;
  city: string;
  state: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

type SkillItem = {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

type ResumeData = {
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
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  summary: string;
  interests: string[];
  media: {
    photoDataUrl: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    website: string;
  };
};

const emptyResume: ResumeData = {
  profile: {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    profession: "",
    address: "",
    nationality: "",
    passportNumber: "",
    phone: "",
    email: "",
  },
  experience: [],
  education: [],
  skills: [],
  summary: "",
  interests: [],
  media: { photoDataUrl: "", facebook: "", twitter: "", linkedin: "", website: "" },
};

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "interests", label: "Interests", icon: Heart },
  { id: "media", label: "Photo & Social", icon: Camera },
] as const;

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("profile");
  const [data, setData] = useState<ResumeData>(emptyResume);
  const printRef = useRef<HTMLDivElement | null>(null);

  // Load/save
  useEffect(() => {
    const raw = localStorage.getItem("resumeBuilder.data");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ResumeData;
        setData(parsed);
      } catch {
        // ignore invalid
      }
    }
  }, []);

  const saveData = () => {
    localStorage.setItem("resumeBuilder.data", JSON.stringify(data));
  };

  const onAddExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          jobTitle: "",
          employer: "",
          city: "",
          state: "",
          startDate: "",
          endDate: "",
          current: false,
          responsibilities: "",
        },
      ],
    }));
  };

  const onRemoveExperience = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const onAddEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          school: "",
          city: "",
          state: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }));
  };

  const onRemoveEducation = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const onAddSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: crypto.randomUUID(), name: "", level: "Beginner" },
      ],
    }));
  };

  const onRemoveSkill = (id: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const onAddInterest = (value: string) => {
    if (!value.trim()) return;
    setData((prev) => ({ ...prev, interests: Array.from(new Set([...prev.interests, value.trim()])) }));
  };

  const onRemoveInterest = (value: string) => {
    setData((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== value) }));
  };

  const tabIndex = useMemo(() => TABS.findIndex((t) => t.id === activeTab), [activeTab]);
  const stepProgress = useMemo(() => Math.round(((tabIndex + 1) / TABS.length) * 100), [tabIndex]);

  const sectionCompletion = useMemo(() => {
    let completed = 0;
    if (data.profile.firstName && data.profile.lastName && (data.profile.email || data.profile.phone)) completed++;
    if (data.experience.length > 0 && data.experience.some((e) => e.jobTitle || e.employer)) completed++;
    if (data.education.length > 0 && data.education.some((e) => e.school || e.degree)) completed++;
    if (data.skills.length > 0 && data.skills.some((s) => s.name)) completed++;
    if (data.summary.trim().length > 0) completed++;
    if (data.interests.length > 0) completed++;
    if (data.media.photoDataUrl || data.media.facebook || data.media.twitter || data.media.linkedin || data.media.website) completed++;
    return Math.round((completed / TABS.length) * 100);
  }, [data]);

  const goNext = () => {
    const next = Math.min(TABS.length - 1, tabIndex + 1);
    setActiveTab(TABS[next].id);
  };
  const goPrev = () => {
    const prev = Math.max(0, tabIndex - 1);
    setActiveTab(TABS[prev].id);
  };

  const handlePhotoUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxBytes) {
      alert("Please upload an image up to 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setData((prev) => ({ ...prev, media: { ...prev.media, photoDataUrl: String(reader.result || "") } }));
    };
    reader.readAsDataURL(file);
  };

  const printResume = () => {
    const content = printRef.current?.innerHTML ?? "";
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!doctype html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><title>Resume</title>
    <style>
      :root{--fg:#0f172a;--muted:#475569;--accent:#4f46e5}
      *{box-sizing:border-box}
      body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial; color:var(--fg); margin:32px;}
      h1,h2,h3{margin:0 0 8px}
      .name{font-size:28px;font-weight:800}
      .muted{color:var(--muted)}
      .section{margin-top:20px}
      .chip{display:inline-block;border:1px solid #e5e7eb;border-radius:999px;padding:4px 10px;margin:4px 6px 0 0;font-size:12px}
      .row{display:flex;gap:12px;align-items:center}
      img{border-radius:9999px;object-fit:cover}
      ul{padding-left:18px;margin:6px 0}
      a{color:var(--accent);text-decoration:none}
    </style></head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    // Give layout a moment before printing
    setTimeout(() => win.print(), 300);
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Resume Builder</h1>
          <p className="text-sm text-muted-foreground">Create a professional resume with a clean, modern layout.</p>
        </div>
        <div className="w-full max-w-md">
          <Progress value={sectionCompletion} />
          <div className="mt-1 text-right text-xs text-muted-foreground">Completion {sectionCompletion}%</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 min-w-0">
        {/* Left: Inputs */}
        <div className="space-y-4 min-w-0">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="w-full flex-nowrap md:flex-wrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-start gap-1 bg-transparent p-0">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className={cn(
                      "rounded-full bg-muted/60 px-3 py-2 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      "transition-colors hover:bg-muted"
                    )}
                  >
                    <Icon className="mr-1.5 h-4 w-4" /> {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Profile */}
              <TabsContent value="profile" className="mt-4">
                <Panel title="Personal Information">
                  <Grid cols={2}>
                    <Field label="First Name">
                      <Input value={data.profile.firstName} onChange={(e) => setData({ ...data, profile: { ...data.profile, firstName: e.target.value } })} />
                    </Field>
                    <Field label="Middle Name">
                      <Input value={data.profile.middleName} onChange={(e) => setData({ ...data, profile: { ...data.profile, middleName: e.target.value } })} />
                    </Field>
                    <Field label="Last Name">
                      <Input value={data.profile.lastName} onChange={(e) => setData({ ...data, profile: { ...data.profile, lastName: e.target.value } })} />
                    </Field>
                    <Field label="Gender">
                      <Input value={data.profile.gender} onChange={(e) => setData({ ...data, profile: { ...data.profile, gender: e.target.value } })} placeholder="Male / Female / Other" />
                    </Field>
                    <Field label="Date of Birth">
                      <Input type="date" value={data.profile.dob} onChange={(e) => setData({ ...data, profile: { ...data.profile, dob: e.target.value } })} />
                    </Field>
                    <Field label="Marital Status">
                      <Input value={data.profile.maritalStatus} onChange={(e) => setData({ ...data, profile: { ...data.profile, maritalStatus: e.target.value } })} placeholder="Single / Married" />
                    </Field>
                    <Field label="Profession">
                      <Input value={data.profile.profession} onChange={(e) => setData({ ...data, profile: { ...data.profile, profession: e.target.value } })} />
                    </Field>
                    <Field label="Nationality">
                      <Input value={data.profile.nationality} onChange={(e) => setData({ ...data, profile: { ...data.profile, nationality: e.target.value } })} />
                    </Field>
                    <Field label="Passport Number">
                      <Input value={data.profile.passportNumber} onChange={(e) => setData({ ...data, profile: { ...data.profile, passportNumber: e.target.value } })} />
                    </Field>
                    <Field label="Phone">
                      <Input type="tel" value={data.profile.phone} onChange={(e) => setData({ ...data, profile: { ...data.profile, phone: e.target.value } })} />
                    </Field>
                    <Field label="Email">
                      <Input type="email" value={data.profile.email} onChange={(e) => setData({ ...data, profile: { ...data.profile, email: e.target.value } })} />
                    </Field>
                  </Grid>
                  <Field label="Address">
                    <Textarea value={data.profile.address} onChange={(e) => setData({ ...data, profile: { ...data.profile, address: e.target.value } })} />
                  </Field>
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} isFirst />
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience" className="mt-4">
                <Panel title="Experience">
                  <div className="space-y-4">
                    {data.experience.map((exp, idx) => (
                      <div key={exp.id} className="rounded-xl border p-4">
                        <div className="mb-2 text-sm font-medium">Role {idx + 1}</div>
                        <Grid cols={2}>
                          <Field label="Job Title">
                            <Input value={exp.jobTitle} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, jobTitle: v } : it) }));
                            }} />
                          </Field>
                          <Field label="Employer">
                            <Input value={exp.employer} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, employer: v } : it) }));
                            }} />
                          </Field>
                          <Field label="City">
                            <Input value={exp.city} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, city: v } : it) }));
                            }} />
                          </Field>
                          <Field label="State">
                            <Input value={exp.state} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, state: v } : it) }));
                            }} />
                          </Field>
                          <Field label="Start Date">
                            <Input type="date" value={exp.startDate} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, startDate: v } : it) }));
                            }} />
                          </Field>
                          <Field label="End Date">
                            <Input type="date" disabled={exp.current} value={exp.endDate} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, endDate: v } : it) }));
                            }} />
                          </Field>
                        </Grid>
                        <div className="mt-2 flex items-center gap-2">
                          <Checkbox id={`exp-current-${exp.id}`} checked={exp.current} onCheckedChange={(c) => setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, current: Boolean(c) } : it) }))} />
                          <Label htmlFor={`exp-current-${exp.id}`}>I currently work here</Label>
                        </div>
                        <div className="mt-3">
                          <Label className="mb-1 block text-sm">Job Duties / Responsibilities</Label>
                          <Textarea value={exp.responsibilities} onChange={(e) => {
                            const v = e.target.value; setData((p) => ({ ...p, experience: p.experience.map((it) => it.id === exp.id ? { ...it, responsibilities: v } : it) }));
                          }} rows={4} />
                        </div>
                        <div className="mt-3 text-right">
                          <Button type="button" variant="secondary" onClick={() => onRemoveExperience(exp.id)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={onAddExperience}>Add Experience</Button>
                    </div>
                  </div>
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} />
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="mt-4">
                <Panel title="Education">
                  <div className="space-y-4">
                    {data.education.map((ed, idx) => (
                      <div key={ed.id} className="rounded-xl border p-4">
                        <div className="mb-2 text-sm font-medium">Entry {idx + 1}</div>
                        <Grid cols={2}>
                          <Field label="School Name">
                            <Input value={ed.school} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, school: v } : it) }));
                            }} />
                          </Field>
                          <Field label="City">
                            <Input value={ed.city} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, city: v } : it) }));
                            }} />
                          </Field>
                          <Field label="State">
                            <Input value={ed.state} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, state: v } : it) }));
                            }} />
                          </Field>
                          <Field label="Degree">
                            <Select value={ed.degree} onValueChange={(v) => setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, degree: v } : it) }))}>
                              <SelectTrigger><SelectValue placeholder="Select degree" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="High School">High School</SelectItem>
                                <SelectItem value="Associate">Associate</SelectItem>
                                <SelectItem value="Bachelor">Bachelor</SelectItem>
                                <SelectItem value="Master">Master</SelectItem>
                                <SelectItem value="PhD">PhD</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>
                          <Field label="Field of Study">
                            <Input value={ed.fieldOfStudy} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, fieldOfStudy: v } : it) }));
                            }} />
                          </Field>
                          <Field label="Start Date">
                            <Input type="date" value={ed.startDate} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, startDate: v } : it) }));
                            }} />
                          </Field>
                          <Field label="End Date">
                            <Input type="date" disabled={ed.current} value={ed.endDate} onChange={(e) => {
                              const v = e.target.value; setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, endDate: v } : it) }));
                            }} />
                          </Field>
                        </Grid>
                        <div className="mt-2 flex items-center gap-2">
                          <Checkbox id={`ed-current-${ed.id}`} checked={ed.current} onCheckedChange={(c) => setData((p) => ({ ...p, education: p.education.map((it) => it.id === ed.id ? { ...it, current: Boolean(c) } : it) }))} />
                          <Label htmlFor={`ed-current-${ed.id}`}>I currently study here</Label>
                        </div>
                        <div className="mt-3 text-right">
                          <Button type="button" variant="secondary" onClick={() => onRemoveEducation(ed.id)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Button type="button" variant="outline" onClick={onAddEducation}>Add Education</Button>
                    </div>
                  </div>
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} />
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills" className="mt-4">
                <Panel title="Skills">
                  <div className="space-y-4">
                    {data.skills.map((s) => (
                      <div key={s.id} className="grid gap-3 rounded-xl border p-4 md:grid-cols-2">
                        <Field label="Skill Name">
                          <Input value={s.name} onChange={(e) => {
                            const v = e.target.value; setData((p) => ({ ...p, skills: p.skills.map((it) => it.id === s.id ? { ...it, name: v } : it) }));
                          }} />
                        </Field>
                        <Field label="Proficiency">
                          <Select value={s.level} onValueChange={(v: SkillItem["level"]) => setData((p) => ({ ...p, skills: p.skills.map((it) => it.id === s.id ? { ...it, level: v } : it) }))}>
                            <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <div className="md:col-span-2 text-right">
                          <Button type="button" variant="secondary" onClick={() => onRemoveSkill(s.id)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Button type="button" variant="outline" onClick={onAddSkill}>Add Skill</Button>
                    </div>
                  </div>
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} />
              </TabsContent>

              {/* Summary */}
              <TabsContent value="summary" className="mt-4">
                <Panel title="Professional Summary">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <Label className="mb-1 block text-sm">Summary</Label>
                      <Textarea rows={10} value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} placeholder="Write a concise, impactful summary highlighting your experience and strengths." />
                    </div>
                    <div className="rounded-xl border bg-muted/20 p-4 text-sm">
                      <div className="mb-2 font-semibold">Suggestions</div>
                      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                        <li>Start with your role and years of experience.</li>
                        <li>Highlight 2–3 core skills aligned with the job.</li>
                        <li>Mention a measurable achievement.</li>
                        <li>Keep it under 4–5 sentences.</li>
                      </ul>
                      <div className="mt-3 font-semibold">Example</div>
                      <p className="mt-1 text-muted-foreground">Frontend developer with 5+ years building performant React apps. Led migration to a component library, reducing defects by 30%. Strong in TypeScript, accessibility, and cross-functional collaboration.</p>
                    </div>
                  </div>
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} />
              </TabsContent>

              {/* Interests */}
              <TabsContent value="interests" className="mt-4">
                <Panel title="Interests & Hobbies">
                  <div className="flex flex-wrap items-center gap-2">
                    {data.interests.map((i) => (
                      <span key={i} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                        {i}
                        <button onClick={() => onRemoveInterest(i)} className="text-muted-foreground hover:text-foreground" aria-label={`Remove ${i}`}>×</button>
                      </span>
                    ))}
                  </div>
                  <AddInterest onAdd={onAddInterest} />
                </Panel>
                <NavBar onPrev={goPrev} onNext={goNext} onSave={saveData} />
              </TabsContent>

              {/* Media & Social */}
              <TabsContent value="media" className="mt-4">
                <Panel title="Photo & Social Links">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-start gap-3">
                      <Avatar className="h-28 w-28">
                        <AvatarImage src={data.media.photoDataUrl} alt="Profile" />
                        <AvatarFallback>
                          {(data.profile.firstName || data.profile.lastName) ? `${data.profile.firstName?.[0] ?? ''}${data.profile.lastName?.[0] ?? ''}`.toUpperCase() : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs text-muted-foreground">Recommended: square image, up to 2MB</div>
                      <div>
                        <Button type="button" variant="outline" className="rounded-full" onClick={() => document.getElementById("photo-input")?.click()}>
                          <Camera className="mr-2 h-4 w-4" /> Upload Photo
                        </Button>
                        <input id="photo-input" className="hidden" type="file" accept="image/*" onChange={handlePhotoUpload} />
                      </div>
                    </div>
                    <div className="md:col-span-2 grid gap-4">
                      <Field label="Facebook">
                        <Input placeholder="https://facebook.com/username" value={data.media.facebook} onChange={(e) => setData({ ...data, media: { ...data.media, facebook: e.target.value } })} />
                      </Field>
                      <Field label="Twitter">
                        <Input placeholder="https://twitter.com/username" value={data.media.twitter} onChange={(e) => setData({ ...data, media: { ...data.media, twitter: e.target.value } })} />
                      </Field>
                      <Field label="LinkedIn">
                        <Input placeholder="https://linkedin.com/in/username" value={data.media.linkedin} onChange={(e) => setData({ ...data, media: { ...data.media, linkedin: e.target.value } })} />
                      </Field>
                      <Field label="Website">
                        <Input placeholder="https://yourwebsite.com" value={data.media.website} onChange={(e) => setData({ ...data, media: { ...data.media, website: e.target.value } })} />
                      </Field>
                    </div>
                  </div>
                </Panel>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" onClick={goPrev}>
                      <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                    </Button>
                    <Button type="button" variant="outline" onClick={saveData}>
                      <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" className="rounded-full bg-green-600 hover:bg-green-700" onClick={printResume}>
                      <Download className="mr-2 h-4 w-4" /> Finish / Download PDF
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: Live preview */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm min-w-0">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <div className="mt-4 rounded-xl border bg-white p-6 overflow-auto">
            <div ref={printRef}>
              <Preview data={data} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div>Step progress: {stepProgress}%</div>
            <div className="w-40"><Progress value={stepProgress} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Grid({ cols = 2, children }: { cols?: 1 | 2 | 3 | 4; children: React.ReactNode }) {
  return <div className={cn("grid gap-4", cols === 1 ? "grid-cols-1" : cols === 2 ? "md:grid-cols-2" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-4")}>{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = useMemo(() => Math.random().toString(36).slice(2), []);
  return (
    <div>
      <Label htmlFor={id} className="mb-1 block text-sm">{label}</Label>
      <div id={id}>{children}</div>
    </div>
  );
}

function AddInterest({ onAdd }: { onAdd: (value: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div className="mt-4 flex items-center gap-2">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add an interest" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(value); setValue(""); } }} />
      <Button type="button" variant="outline" onClick={() => { onAdd(value); setValue(""); }}>Add</Button>
    </div>
  );
}

function NavBar({ onPrev, onNext, onSave, isFirst = false }: { onPrev: () => void; onNext: () => void; onSave: () => void; isFirst?: boolean }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" onClick={onPrev} disabled={isFirst}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
        <Button type="button" className="rounded-full bg-primary px-5 hover:bg-primary/90" onClick={onNext}>
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Preview({ data }: { data: ResumeData }) {
  const fullName = [data.profile.firstName, data.profile.middleName, data.profile.lastName].filter(Boolean).join(" ");
  return (
    <article className="max-w-none text-sm break-words">
      <header className="flex items-center justify-between gap-4">
        <div>
          {fullName && <h1 className="name m-0 text-xl font-extrabold">{fullName}</h1>}
          {data.profile.profession && <div className="m-0 text-sm text-muted-foreground">{data.profile.profession}</div>}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {data.profile.email && <span>{data.profile.email}</span>}
            {data.profile.phone && <span>{data.profile.phone}</span>}
            {data.profile.address && <span>{data.profile.address}</span>}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {data.media.facebook && (
              <a href={data.media.facebook} target="_blank" rel="noreferrer" className="text-blue-600">Facebook</a>
            )}
            {data.media.twitter && (
              <a href={data.media.twitter} target="_blank" rel="noreferrer" className="text-sky-600">Twitter</a>
            )}
            {data.media.linkedin && (
              <a href={data.media.linkedin} target="_blank" rel="noreferrer" className="text-blue-700">LinkedIn</a>
            )}
            {data.media.website && (
              <a href={data.media.website} target="_blank" rel="noreferrer" className="text-indigo-600">Website</a>
            )}
          </div>
        </div>
        {data.media.photoDataUrl && (
          <img src={data.media.photoDataUrl} alt="Profile" width={96} height={96} />
        )}
      </header>

      {data.summary && (
        <section className="section">
          <h2 className="m-0 text-base font-bold">Summary</h2>
          <p className="m-0 text-sm text-muted-foreground whitespace-pre-line">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="section">
          <h2 className="m-0 text-base font-bold">Experience</h2>
          <div className="mt-2 space-y-3">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="row">
                  {e.jobTitle && <div className="font-semibold">{e.jobTitle}</div>}
                  {(e.city || e.state) && <div className="muted">{[e.city, e.state].filter(Boolean).join(", ")}</div>}
                </div>
                {e.employer && <div className="muted">{e.employer}</div>}
                {(e.startDate || e.endDate || e.current) && (
                  <div className="muted text-xs">{e.startDate} {e.startDate && (e.endDate || e.current) ? "—" : ""} {e.current ? "Present" : e.endDate}</div>
                )}
                {e.responsibilities && (
                  <ul>
                    {e.responsibilities.split(/\n+/).filter(Boolean).map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="section">
          <h2 className="m-0 text-base font-bold">Education</h2>
          <div className="mt-1 space-y-2">
            {data.education.map((e) => (
              <div key={e.id}>
                <div className="row">
                  {e.degree && <div className="font-semibold">{e.degree}</div>}
                  {e.fieldOfStudy && <div className="muted">{e.fieldOfStudy}</div>}
                </div>
                {e.school && <div className="muted">{e.school}</div>}
                {(e.city || e.state) && <div className="muted text-xs">{[e.city, e.state].filter(Boolean).join(", ")}</div>}
                {(e.startDate || e.endDate || e.current) && (
                  <div className="muted text-xs">{e.startDate} {e.startDate && (e.endDate || e.current) ? "—" : ""} {e.current ? "Present" : e.endDate}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="section">
          <h2 className="m-0 text-base font-bold">Skills</h2>
          <div className="mt-2">
            {data.skills.filter((s) => s.name).map((s) => (
              <span key={s.id} className="chip">{s.name} • {s.level}</span>
            ))}
          </div>
        </section>
      )}

      {data.interests.length > 0 && (
        <section className="section">
          <h2 className="m-0 text-base font-bold">Interests</h2>
          <div className="mt-1">
            {data.interests.map((i) => (
              <span key={i} className="chip">{i}</span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

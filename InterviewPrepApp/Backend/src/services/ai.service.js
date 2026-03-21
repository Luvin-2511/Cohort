const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const questionSchema = {
  type: "OBJECT",
  properties: {
    question: { type: "STRING" },
    intention: { type: "STRING" },
    answer: { type: "STRING" },
  },
  required: ["question", "intention", "answer"],
};

const interviewReportSchema = {
  type: "OBJECT",
  properties: {
    technicalQuestions: {
      type: "ARRAY",
      items: questionSchema,
    },
    behavioralQuestions: {
      type: "ARRAY",
      items: questionSchema,
    },
    skillGap: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          skill: { type: "STRING" },
          severity: { type: "STRING" },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          day: { type: "STRING" },
          focus: { type: "STRING" },
          tasks: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: { type: "STRING" },
    score: { type: "NUMBER" },
  },
  required: [
    "technicalQuestions",
    "behavioralQuestions",
    "skillGap",
    "preparationPlan",
    "score",
  ],
};

async function generateInterviewReport({
  selfDescription,
  resume,
  jobDescription,
}) {
  const prompt = `
Generate an interview preparation report.

STRICT RULES:
- Return ONLY valid JSON.
- Do NOT include explanations or markdown.
- Follow the schema EXACTLY.
- Do NOT add extra fields.
- Do NOT omit any required fields.
- Ensure all arrays and objects match the schema.

REQUIRED JSON STRUCTURE (follow this exactly):
{
  "technicalQuestions": [{ "question": "...", "intention": "...", "answer": "..." }],
  "behavioralQuestions": [{ "question": "...", "intention": "...", "answer": "..." }],
  "skillGap": [{ "skill": "...", "severity": "Low|Medium|High" }],
  "preparationPlan": [{ "day": "Day 1", "focus": "...", "tasks": ["..."] }],
  "title":"Title in 2 to 3 words",
  "score": 0
}

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    },
  });

  return JSON.parse(response.text);
}

async function convertHTMLtoPDF(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "networkidle2",
  });
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  return pdfBuffer;
}

async function generateResumePDF({ resume, jobDescription, selfDescription }) {
  const ResumeSchema = {
    type: "OBJECT",
    properties: {
      resume: {
        type: "STRING",
        description: "HTML format of the user's resume suitable for the job",
      },
    },
    required: ["resume"],
  };
  const prompt = `
You are an expert resume writer and career coach with 10+ years of experience helping candidates land jobs at top companies.

Create a STUNNING, ATS-optimized HTML resume that will stand out from hundreds of applicants.

RESUME CONTENT INPUTS:
- Current Resume: ${resume}
- Job Description: ${jobDescription}  
- Candidate's Self Description: ${selfDescription}

CONTENT RULES:
- Tailor EVERY bullet point to match keywords from the job description
- Quantify achievements wherever possible (e.g., "Increased performance by 40%")
- Use strong action verbs (Led, Built, Optimized, Architected, Delivered, Scaled)
- Remove irrelevant experience, keep only what matters for THIS job
- Write a punchy 2-line summary that directly addresses what the employer wants
- Order sections: Summary → Skills → Experience → Projects → Education

HTML & STYLING RULES:
- Use a clean, modern single-column or two-column layout
- Fonts: Use Google Fonts - 'Inter' or 'Roboto' for body, slightly larger for name
- Color scheme: Dark navy (#1a2332) for headings, clean white background, subtle gray (#f8f9fa) for section backgrounds
- Name should be large and bold at the top (28-32px)
- Section headers should have a colored left border or underline accent
- Skills should be displayed as styled tags/chips, not plain text
- Each job entry should have company, title, date range clearly separated
- Bullet points should use a custom colored bullet (▸ or →)
- Add subtle box shadows on section cards for depth
- Make it printer-friendly with proper margins (0.5in)
- DO NOT use any external images or icons that might not load
- Embed ALL styles in a <style> tag inside <head>
- The resume must look like it was designed by a professional graphic designer
- Ensure proper spacing, visual hierarchy, and whitespace

OUTPUT: Return ONLY the complete HTML document, no explanations.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: ResumeSchema,
    },
  });

  const raw = response.text;
  const result = typeof raw === "string" ? JSON.parse(raw) : raw;
  const htmlContent = result.resume;
  const pdfBuffer = await convertHTMLtoPDF(htmlContent);
  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePDF };

const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const interviewReportSchema = z.object({
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A commonly asked technical interview question tailored to the candidate's domain, experience level, and job description.",
          ),
        intention: z
          .string()
          .describe(
            "Explains why the interviewer asks this question, including the specific skill, concept, or thinking ability they want to evaluate.",
          ),
        answer: z
          .string()
          .describe(
            "A well-structured, ideal answer that demonstrates strong understanding, clarity, and practical knowledge expected by the interviewer.",
          ),
      }),
    )
    .describe(
      "A list of high-probability technical interview questions based on the candidate's profile, resume, and target job role.",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A frequently asked behavioral interview question relevant to the candidate's role, experience, and work scenarios.",
          ),
        intention: z
          .string()
          .describe(
            "Describes what personality trait, soft skill, or past experience the interviewer aims to evaluate through this question.",
          ),
        answer: z
          .string()
          .describe(
            "A strong sample answer (preferably structured like STAR method) that reflects good communication, decision-making, and professionalism.",
          ),
      }),
    )
    .describe(
      "A collection of behavioral interview questions designed to assess communication, teamwork, adaptability, and problem-solving abilities.",
    ),

  skillGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The specific skill or knowledge area where the candidate is lacking or needs improvement based on job requirements.",
          ),
        severity: z
          .string()
          .describe(
            "Indicates how critical the skill gap is (e.g., Low, Medium, High) in relation to the target job role.",
          ),
      }),
    )
    .describe(
      "An analysis of missing or weak skills that may affect the candidate's chances, along with their importance level.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .string()
          .describe(
            "The specific day or timeline marker in the preparation schedule (e.g., Day 1, Day 2, etc.).",
          ),
        focus: z
          .string()
          .describe(
            "The main topic or skill area the candidate should concentrate on for that particular day.",
          ),
        tasks: z
          .array(
            z
              .string()
              .describe(
                "A specific actionable task such as studying a concept, solving problems, or practicing mock interviews.",
              ),
          )
          .describe(
            "A list of concrete, step-by-step actions the candidate should complete on that day to improve effectively.",
          ),
      }),
    )
    .describe(
      "A structured day-by-day preparation roadmap designed to help the candidate improve skills and perform well in interviews.",
    ),
  score: z
    .number()
    .describe(
      "The score that ranges from 0 to 100 which tells how close is user to the required job he is chasing",
    ),
});

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
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log(JSON.parse(response.text));
}

module.exports = generateInterviewReport;

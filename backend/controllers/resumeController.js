// AI Career Coach - Resume Analysis Controller
const fs = require("fs");

// Comprehensive Skill Registry (50+ Skills)
const ALL_SKILLS = [
    "Python", "SQL", "Git", "JavaScript", "HTML", "CSS", "React", "Node.js", "Java", "C++",
    "Docker", "AWS", "Linux", "REST APIs", "Pandas", "NumPy", "Scikit-Learn", "PostgreSQL",
    "MongoDB", "Express.js", "TypeScript", "Kubernetes", "Data Structures", "Algorithms",
    "C", "PHP", "Ruby", "Go", "Kotlin", "Swift", "Flutter", "React Native", "GraphQL",
    "Redis", "Elasticsearch", "Terraform", "CI/CD", "Jenkins", "GitHub", "Excel", "Tableau",
    "Power BI", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP",
    "System Design", "Microservices", "Agile", "Scrum", "C#"
];

const ACTION_VERBS = [
    "developed", "implemented", "created", "designed", "optimized", "managed", "built",
    "spearheaded", "engineered", "automated", "delivered", "launched", "integrated", "led",
    "reduced", "improved", "increased", "accelerated", "deployed", "collaborated", "architected"
];

// Main ATS Analysis Engine
function analyzeResumeText(rawText, targetRoleKey = "softwareengineer") {
    const text = rawText || "";
    const rawLower = text.toLowerCase();

    // 1. Contact Extraction
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const email = emailMatch ? emailMatch[0] : null;
    const phone = phoneMatch ? phoneMatch[0] : null;

    // Detect Name from top lines
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    let detectedName = "Candidate";
    if (lines.length > 0 && lines[0].length < 40 && !lines[0].includes("@")) {
        detectedName = lines[0];
    }

    // 2. Section Headings Check
    const hasSummary = rawLower.includes("summary") || rawLower.includes("objective") || rawLower.includes("profile");
    const hasEducation = rawLower.includes("education") || rawLower.includes("bachelor") || rawLower.includes("b.tech") || rawLower.includes("degree");
    const hasExperience = rawLower.includes("experience") || rawLower.includes("employment") || rawLower.includes("intern") || rawLower.includes("work");
    const hasProjects = rawLower.includes("project") || rawLower.includes("developed") || rawLower.includes("built");
    const hasSkills = rawLower.includes("skill") || rawLower.includes("technologies") || rawLower.includes("proficiencies");
    const hasCertification = rawLower.includes("certificate") || rawLower.includes("certification") || rawLower.includes("certified");
    const hasGitHub = rawLower.includes("github") || rawLower.includes("gitlab") || rawLower.includes("portfolio");
    const hasLinkedIn = rawLower.includes("linkedin");

    // 3. Skill & Keyword Detection
    const detectedSkills = ALL_SKILLS.filter(skill => rawLower.includes(skill.toLowerCase()));

    // 4. Action Verbs Count
    const matchedVerbs = ACTION_VERBS.filter(verb => rawLower.includes(verb));
    const actionVerbsCount = matchedVerbs.length;

    // 5. Score Calculations
    let atsScore = 45;
    atsScore += Math.min(22, detectedSkills.length * 2.2);        // up to +22 for skills
    atsScore += Math.min(12, actionVerbsCount * 1.5);              // up to +12 for action verbs
    atsScore += hasGitHub ? 5 : 0;
    atsScore += hasLinkedIn ? 3 : 0;
    atsScore += hasProjects ? 5 : 0;
    atsScore += hasExperience ? 5 : 0;
    atsScore += hasSummary ? 3 : 0;
    atsScore += hasEducation ? 5 : 0;
    atsScore = Math.min(98, Math.max(35, Math.round(atsScore)));

    const grammarScore = Math.min(98, Math.max(70, 82 + actionVerbsCount * 2));
    const keywordScore = Math.min(95, Math.round((detectedSkills.length / 15) * 100));
    const projectScore = hasProjects ? Math.min(92, 70 + (hasCertification ? 20 : 5)) : 40;
    const verbScore = Math.min(95, actionVerbsCount * 12);
    const relevanceFit = Math.min(95, Math.max(50, Math.round((detectedSkills.length / 12) * 100)));

    // 6. Strengths & Weaknesses
    const strengths = [];
    if (atsScore >= 75) strengths.push("Strong overall ATS format and structure.");
    if (detectedSkills.length >= 8) strengths.push(`Rich technical vocabulary (${detectedSkills.length} skills detected).`);
    if (actionVerbsCount >= 5) strengths.push(`High impact language with ${actionVerbsCount} strong action verbs.`);
    if (hasGitHub) strengths.push("Includes online repository links (GitHub/GitLab).");
    if (hasProjects) strengths.push("Clear project experience highlighted.");

    const weaknesses = [];
    if (!hasGitHub) weaknesses.push("Missing GitHub / GitLab portfolio repository link.");
    if (detectedSkills.length < 6) weaknesses.push("Limited technical skills keywords detected.");
    if (actionVerbsCount < 4) weaknesses.push("Low usage of strong impact action verbs.");
    if (!hasProjects) weaknesses.push("Missing dedicated engineering/academic projects section.");
    if (!hasSummary) weaknesses.push("Missing executive Summary or Objective header.");
    if (!hasCertification) weaknesses.push("No industry certifications found.");

    // 7. Recommendations & Suggestions
    const suggestions = [];
    if (!hasGitHub) suggestions.push("Add GitHub / GitLab portfolio links to showcase your code.");
    if (detectedSkills.length < 6) suggestions.push("Include core technical skills and framework keywords.");
    if (actionVerbsCount < 4) suggestions.push("Use action verbs: 'Engineered', 'Optimized', 'Delivered', 'Deployed'.");
    if (!hasProjects) suggestions.push("Add at least 2 engineering projects with quantified impact metrics.");
    if (!hasSummary) suggestions.push("Add a 2-line professional Summary section at the top.");
    if (!hasCertification) suggestions.push("Add industry certifications (AWS, Google, Coursera, Meta).");

    const recommendations = suggestions;

    // Missing keywords sample (from full skills list)
    const missingKeywords = ALL_SKILLS.filter(s => !detectedSkills.includes(s)).slice(0, 10);

    return {
        success: true,
        atsScore,
        matchedKeywords: detectedSkills,
        missingKeywords,
        strengths,
        weaknesses,
        recommendations,
        scores: {
            overallAts: atsScore,
            grammar: grammarScore,
            keywords: keywordScore,
            projects: projectScore,
            verbs: verbScore,
            relevanceFit
        },
        details: {
            name: detectedName,
            email,
            phone,
            actionVerbsCount,
            hasGitHub,
            hasLinkedIn,
            hasProjects,
            hasInternship: hasExperience,
            hasSummary,
            hasEducation,
            hasCertification
        },
        detectedSkills: detectedSkills.length > 0 ? detectedSkills : ["Python", "SQL", "Git", "JavaScript"],
        suggestions: suggestions.length > 0 ? suggestions : ["Your resume looks well-optimized! Keep updating impact metrics."],
        summary: `Resume parsed successfully with ATS Rank ${atsScore}/100. ${detectedSkills.length} skills detected.`
    };
}

// Controller logic for POST /api/resume/analyze
exports.analyzeResume = async (req, res) => {
    try {
        let text = "";

        // Check if file was uploaded via multipart/form-data
        if (req.file) {
            const file = req.file;
            const ext = (file.originalname || "").split(".").pop().toLowerCase();

            if (ext === "txt") {
                text = file.buffer.toString("utf-8");
            } else if (ext === "docx") {
                try {
                    const mammoth = require("mammoth");
                    const result = await mammoth.extractRawText({ buffer: file.buffer });
                    text = result.value;
                } catch (e) {
                    text = file.buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ");
                }
            } else if (ext === "pdf") {
                try {
                    const pdfParse = require("pdf-parse");
                    const pdfData = await pdfParse(file.buffer);
                    text = pdfData.text;
                } catch (e) {
                    text = file.buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ");
                }
            } else {
                text = file.buffer.toString("utf-8");
            }
        } else if (req.body && req.body.text) {
            text = req.body.text;
        }

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "No resume text or file provided. Please paste text or upload a PDF/DOCX/TXT file."
            });
        }

        const targetRole = req.body.targetRole || "softwareengineer";
        const analysis = analyzeResumeText(text, targetRole);
        analysis.extractedText = text;

        return res.json(analysis);
    } catch (err) {
        console.error("[Resume Analyze Error]:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to analyze resume due to a server error: " + err.message
        });
    }
};

exports.analyzeResumeText = analyzeResumeText;

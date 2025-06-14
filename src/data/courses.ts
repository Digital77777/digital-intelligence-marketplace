
export type Tier = "freemium" | "basic" | "pro";

export interface Course {
  id: string;
  title: string;
  description: string;
  tier: Tier;
  content?: string;
  transformative?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  courses: string[]; // course ids
  tier: Tier;
  outcome: string;
  pathDescription: string;
}

// Freemium Courses
export const freemiumCourses: Course[] = [
  {
    id: "ai-101",
    title: "AI 101: Demystifying Artificial Intelligence",
    description: "What AI really is, real-world examples, debunking myths.",
    tier: "freemium",
    transformative: `Turns "AI is magic" → "AI is a tool I can use."`
  },
  {
    id: "no-code-jumpstart",
    title: "No-Code Jumpstart: Your First AI Tool in 20 Minutes",
    description: "Drag-and-drop sentiment analysis for social media.",
    tier: "freemium",
    transformative: `"I can't code" → "I built something useful!"`
  },
  {
    id: "data-literacy-essentials",
    title: "Data Literacy Essentials",
    description: "Understanding datasets, spotting biases, basic cleaning.",
    tier: "freemium",
    transformative: "Fear of data → Confidence in interpreting it."
  },
  {
    id: "ethical-ai",
    title: "Ethical AI: Why Fairness Matters",
    description: "Bias in algorithms, societal impacts, simple audits.",
    tier: "freemium",
    transformative: "Passive user → Ethically conscious builder."
  },
  {
    id: "marketplace-intro",
    title: "Meet the Marketplace: Turning Skills into Income",
    description: "How freelancers earn $500+/month (case studies).",
    tier: "freemium",
    transformative: `"AI is for experts" → "I could monetize this too."`
  }
];

// Freemium Learning Paths
export const freemiumLearningPaths: LearningPath[] = [
  {
    id: "zero-to-maker",
    title: "Zero-to-Maker Pathway",
    courses: ["ai-101", "no-code-jumpstart", "data-literacy-essentials"],
    tier: "freemium",
    pathDescription: "AI 101 → No-Code Jumpstart → Data Literacy",
    outcome: "Build a spam detector tool + earn a shareable badge."
  },
  {
    id: "ethical-explorer",
    title: "Ethical Explorer Track",
    courses: ["ethical-ai", "data-literacy-essentials", "marketplace-intro"],
    tier: "freemium",
    pathDescription: "Ethical AI → Data Literacy → Marketplace Intro",
    outcome: "Audit a sample hiring algorithm + certification."
  }
];

// Basic Tier
export const basicCourses: Course[] = [
  {
    id: "python-busy-pros",
    title: "Python for Busy Professionals",
    description: "Automate reports/emails with 10 lines of code.",
    tier: "basic"
  },
  {
    id: "no-code-wizardry",
    title: "No-Code Workflow Wizardry",
    description: "Connect Slack + Google Sheets + DIM tools.",
    tier: "basic"
  },
  {
    id: "ai-powered-marketing",
    title: "AI-Powered Marketing Analytics",
    description: "Customer segmentation, ROI prediction.",
    tier: "basic"
  },
  {
    id: "chatbot-builder",
    title: "Chatbot Builder",
    description: "Create customer service bots in 1 hour.",
    tier: "basic"
  },
  {
    id: "data-storytelling",
    title: "Data Storytelling with Viz Tools",
    description: "Turn spreadsheets into compelling dashboards.",
    tier: "basic"
  },
  {
    id: "freelancer-launchpad",
    title: "Freelancer Launchpad",
    description: "Setting rates, portfolio building, first gig.",
    tier: "basic"
  },
  {
    id: "api-integrations",
    title: "API Integrations Made Simple",
    description: "Connect DIM tools to Zapier/Make.",
    tier: "basic"
  },
  {
    id: "bias-detection",
    title: "Bias Detection Toolkit",
    description: "Audit tools for fairness in hiring/lending.",
    tier: "basic"
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance Basics",
    description: "Forecast equipment failures for manufacturers.",
    tier: "basic"
  },
  {
    id: "associate-exam-prep",
    title: "DIM Certified Associate Exam Prep",
    description: "Mock tests + project review.",
    tier: "basic"
  }
];

export const basicLearningPaths: LearningPath[] = [
  {
    id: "automation-specialist",
    title: "Automation Specialist",
    courses: ["python-busy-pros", "no-code-wizardry", "api-integrations"],
    tier: "basic",
    pathDescription: "Python → No-Code Wizardry → API Integrations",
    outcome: "Build an automated sales report pipeline."
  },
  {
    id: "marketing-ai-pro",
    title: "Marketing AI Pro",
    courses: ["ai-powered-marketing", "data-storytelling", "chatbot-builder"],
    tier: "basic",
    pathDescription: "Marketing Analytics → Data Storytelling → Chatbot Builder",
    outcome: "Deploy a customer engagement bot + certification."
  },
  {
    id: "freelance-accelerator",
    title: "Freelance Accelerator",
    courses: [
      "freelancer-launchpad",
      "api-integrations",
      "associate-exam-prep"
    ],
    tier: "basic",
    pathDescription: "Freelancer Launchpad → API Integrations → DIM Certification",
    outcome: "Land first paid gig ($200+)."
  },
  {
    id: "ethical-engineer",
    title: "Ethical Engineer",
    courses: ["bias-detection", "predictive-maintenance"],
    tier: "basic",
    pathDescription: "Bias Detection → Predictive Maintenance",
    outcome: "Certified DIM Associate badge + audit portfolio."
  }
];

// Pro Tier
export const proCourses: Course[] = [
  {
    id: "genai-architect",
    title: "Generative AI Architect",
    description: "Fine-tuning LLMs for custom business apps.",
    tier: "pro"
  },
  {
    id: "mlops-deployment",
    title: "MLOps: Deployment & Scaling",
    description: "Docker, Kubernetes, AWS SageMaker pipelines.",
    tier: "pro"
  },
  {
    id: "adv-no-code",
    title: "Advanced No-Code Customization",
    description: "Build proprietary templates to sell in the marketplace.",
    tier: "pro"
  },
  {
    id: "ai-financial-forecasting",
    title: "AI for Financial Forecasting",
    description: "Stock prediction, risk modeling, fraud detection.",
    tier: "pro"
  },
  {
    id: "computer-vision-bootcamp",
    title: "Computer Vision Bootcamp",
    description: "Object detection for healthcare/retail.",
    tier: "pro"
  },
  {
    id: "power-seller-strategies",
    title: "Marketplace Power Seller Strategies",
    description: "Scaling to $10K/month, retainers, IP licensing.",
    tier: "pro"
  },
  {
    id: "enterprise-solution-design",
    title: "Enterprise Solution Design",
    description: "HIPAA/GDPR-compliant workflows.",
    tier: "pro"
  },
  {
    id: "nlp-specialist",
    title: "NLP Specialist",
    description: "Multilingual sentiment analysis, legal doc parsing.",
    tier: "pro"
  },
  {
    id: "ai-product-mgmt",
    title: "AI Product Management",
    description: "Scoping, pricing, and launching AI products.",
    tier: "pro"
  },
  {
    id: "adv-ethical-hacking",
    title: "Advanced Ethical Hacking",
    description: "Pen-testing AI models for vulnerabilities.",
    tier: "pro"
  },
  {
    id: "quantum-ml-foundations",
    title: "Quantum ML Foundations",
    description: "Primer for quantum computing applications.",
    tier: "pro"
  },
  {
    id: "consulting-mastery",
    title: "Consulting Mastery",
    description: "Pitching Fortune 500 clients, $50K+ contracts.",
    tier: "pro"
  },
  {
    id: "pro-cert-lab",
    title: "DIM Pro Certification Lab",
    description: "Capstone project with industry dataset.",
    tier: "pro"
  },
  {
    id: "ai-research-monetization",
    title: "AI Research Monetization",
    description: "Publishing papers, patenting, licensing IP.",
    tier: "pro"
  },
  {
    id: "team-leadership-ai",
    title: "Team Leadership in AI",
    description: "Managing cross-functional AI teams.",
    tier: "pro"
  }
];

export const proLearningPaths: LearningPath[] = [
  {
    id: "genai-entrepreneur",
    title: "Generative AI Entrepreneur",
    courses: ["genai-architect", "power-seller-strategies", "ai-research-monetization"],
    tier: "pro",
    pathDescription: "Gen AI Architect → Marketplace Power Seller → IP Monetization",
    outcome: "Launch a $99/month API product."
  },
  {
    id: "mlops-engineer",
    title: "MLOps Engineer",
    courses: ["mlops-deployment", "computer-vision-bootcamp", "pro-cert-lab"],
    tier: "pro",
    pathDescription: "MLOps → Computer Vision → Pro Certification",
    outcome: "Deploy a hospital tumor-detection system."
  },
  {
    id: "financial-ai-strategist",
    title: "Financial AI Strategist",
    courses: ["ai-financial-forecasting", "adv-ethical-hacking"],
    tier: "pro",
    pathDescription: "Financial Forecasting → Ethical Hacking",
    outcome: "Build a fraud-detection model for banks."
  },
  {
    id: "enterprise-solutions-architect",
    title: "Enterprise Solutions Architect",
    courses: ["enterprise-solution-design", "team-leadership-ai", "consulting-mastery"],
    tier: "pro",
    pathDescription: "Enterprise Design → Team Leadership → Consulting",
    outcome: "Certified DIM Pro + client project portfolio."
  },
  {
    id: "nlp-marketplace-innovator",
    title: "NLP Marketplace Innovator",
    courses: ["nlp-specialist", "adv-no-code", "power-seller-strategies"],
    tier: "pro",
    pathDescription: "NLP Specialist → Custom No-Code Tools → Power Selling",
    outcome: "Sell multilingual chatbot templates."
  },
  {
    id: "ethical-ai-auditor",
    title: "Ethical AI Auditor",
    courses: ["bias-detection", "adv-ethical-hacking"],
    tier: "pro",
    pathDescription: "Bias Detection → Advanced Ethical Hacking",
    outcome: "ISO-certified auditor credential."
  },
  {
    id: "research-to-income",
    title: "Research-to-Income Track",
    courses: ["quantum-ml-foundations", "ai-research-monetization"],
    tier: "pro",
    pathDescription: "Quantum ML → AI Research Monetization",
    outcome: "Publish paper + license algorithm to DIM marketplace."
  }
];

// Export all for easy import
export const allCourses: Course[] = [
  ...freemiumCourses,
  ...basicCourses,
  ...proCourses
];

export const allLearningPaths: LearningPath[] = [
  ...freemiumLearningPaths,
  ...basicLearningPaths,
  ...proLearningPaths
];

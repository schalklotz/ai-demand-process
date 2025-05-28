// src/sampleData.js

export const sampleIdeasData = [
  {
    id: 'idea_1',
    projectName: "AI-Powered Code Review Assistant",
    problem: "Manual code reviews are time-consuming and can miss subtle bugs.",
    solution: "Develop an AI tool that integrates with Git to automatically review pull requests, suggest improvements, and identify potential issues.",
    champion: "Alice Wonderland",
    sponsor: "Bob The Builder",
    status: "New",
    estCost: 75000,
    costHorizon: "H2 2025",
    timeHorizon: "Medium-term",
    perceivedValue: 9,
    effort: 20, // Person-weeks
    confidence: 75, // Percentage
    pitchDeckLink: "https://example.com/pitch/ai-code-review"
  },
  {
    id: 'idea_2',
    projectName: "Sustainable Packaging Initiative",
    problem: "Current packaging generates too much waste and uses non-renewable resources.",
    solution: "Research and implement biodegradable and recycled packaging materials across all product lines.",
    champion: "Eve Green",
    sponsor: "David Attenborough",
    status: "In Review",
    estCost: 120000,
    costHorizon: "Q1 2026",
    timeHorizon: "Long-term",
    perceivedValue: 8,
    effort: 35,
    confidence: 80,
    pitchDeckLink: "https://example.com/pitch/sustainable-packaging"
  },
  {
    id: 'idea_3',
    projectName: "Employee Wellness Platform",
    problem: "Need to improve employee well-being and provide better access to mental health resources.",
    solution: "Launch an online platform with resources, workshops, and confidential counseling services.",
    champion: "Grace Hopper",
    sponsor: "Florence Nightingale",
    status: "Approved",
    estCost: 50000,
    costHorizon: "Q4 2024",
    timeHorizon: "Short-term",
    perceivedValue: 7,
    effort: 15,
    confidence: 90,
    pitchDeckLink: "https://example.com/pitch/wellness-platform"
  },
   {
    id: 'idea_4',
    projectName: "Gamified Learning Modules",
    problem: "Traditional training modules have low engagement and completion rates.",
    solution: "Develop interactive, gamified learning modules for key company training programs to improve knowledge retention.",
    champion: "Charles Xavier",
    sponsor: "Diana Prince",
    status: "New",
    estCost: 60000,
    costHorizon: "H1 2025",
    timeHorizon: "Medium-term",
    perceivedValue: 8,
    effort: 25,
    confidence: 70,
    pitchDeckLink: "https://example.com/pitch/gamified-learning"
  }
];

export const sampleProjectsData = [
  {
    id: 'project_1', // Promoted from a (now removed) idea_x
    projectName: "Customer Portal Overhaul",
    problem: "Current customer portal is outdated and difficult to navigate.",
    solution: "Redesign and rebuild the customer portal using modern web technologies for improved UX and new features.",
    champion: "Charlie Brown",
    sponsor: "Diana Prince",
    status: "Planned",
    estCost: 120000,
    costHorizon: "2025",
    timeHorizon: "Long-term",
    perceivedValue: 8,
    effort: 40,
    confidence: 85,
    pitchDeckLink: "https://example.com/pitch/portal-overhaul",
    startDate: "2025-04-01",
    endDate: "2025-10-31",
    assignedTeams: ["Team Hydra", "Team Pegasus"]
  },
  {
    id: 'idea_3', // Promoted from idea_3 (Employee Wellness Platform)
    projectName: "Employee Wellness Platform",
    problem: "Need to improve employee well-being and provide better access to mental health resources.",
    solution: "Launch an online platform with resources, workshops, and confidential counseling services.",
    champion: "Grace Hopper",
    sponsor: "Florence Nightingale",
    status: "Active", // Changed from Approved to Active
    estCost: 55000, // Slightly adjusted cost
    costHorizon: "Q4 2024",
    timeHorizon: "Short-term",
    perceivedValue: 7,
    effort: 18, // Slightly adjusted effort
    confidence: 88, // Slightly adjusted confidence
    pitchDeckLink: "https://example.com/pitch/wellness-platform",
    startDate: "2024-10-01",
    endDate: "2025-03-31",
    assignedTeams: ["Team Nightingale"]
  }
];

export const sampleBacklogData = [
  {
    id: 'bklg_1',
    projectId: 'project_1',
    projectName: "Customer Portal Overhaul",
    epic: "User Authentication Module",
    feature: "Implement OAuth2 login with Google",
    team: "Team Hydra",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    duration: 30, // days
    startOffset: 0, // days from project start
    milestone: "Q2 2025 Delivery",
    label: "Security, Core Feature",
    dependencies: [],
    changeReason: "",
    status: "To Do"
  },
  {
    id: 'bklg_2',
    projectId: 'project_1',
    projectName: "Customer Portal Overhaul",
    epic: "User Authentication Module",
    feature: "Implement 2FA (TOTP)",
    team: "Team Hydra",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    duration: 31,
    startOffset: 30, // after OAuth2
    milestone: "Q2 2025 Delivery",
    label: "Security, Enhancement",
    dependencies: ['bklg_1'],
    changeReason: "",
    status: "To Do"
  },
  {
    id: 'bklg_3',
    projectId: 'idea_3', // Linked to Employee Wellness Platform project
    projectName: "Employee Wellness Platform",
    epic: "Content Delivery",
    feature: "Develop resource library for mental health articles",
    team: "Team Nightingale",
    startDate: "2024-10-15",
    endDate: "2024-11-30",
    duration: 46,
    startOffset: 14, // 2 weeks after project start
    milestone: "Phase 1 Launch",
    label: "Content",
    dependencies: [],
    changeReason: "",
    status: "In Progress"
  }
];

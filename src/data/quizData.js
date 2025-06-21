// src/data/quizData.js

// The 7 Core Archetypes
export const archetypes = [
  "Educator", "Creator", "Builder", "Curator", "Guide", "Explorer", "Minimalist"
];

// Quiz Questions - "Select all that apply"
export const questions = [
  {
    id: 1,
    text: "When facing a new digital project, which of these approaches resonate most with you? (Select all that apply)",
    options: [
      { text: "Developing clear tutorials or guides to help others understand it.", archetype: "Educator" },
      { text: "Dreaming up entirely new concepts or a unique visual/functional direction.", archetype: "Creator" },
      { text: "Focusing on the technical build, coding, or system architecture.", archetype: "Builder" },
      { text: "Researching and compiling the best existing tools, examples, or information related to it.", archetype: "Curator" },
      { text: "Thinking about who it will serve and how I can best support them through the process.", archetype: "Guide" },
      { text: "Wanting to experiment with new technologies or unconventional methods.", archetype: "Explorer" },
      { text: "Identifying the absolute core value and how to deliver it with utmost simplicity.", archetype: "Minimalist" },
    ],
  },
  {
    id: 2,
    text: "I gain the most satisfaction from... (Select all that apply)",
    options: [
      { text: "Successfully teaching or explaining a complex topic to someone.", archetype: "Educator" },
      { text: "Bringing an original idea from my imagination into reality.", archetype: "Creator" },
      { text: "Constructing a well-functioning system or a tangible digital product.", archetype: "Builder" },
      { text: "Discovering and organizing valuable resources that others can benefit from.", archetype: "Curator" },
      { text: "Guiding someone through a challenge and seeing them succeed.", archetype: "Guide" },
      { text: "Exploring new possibilities and making unexpected discoveries.", archetype: "Explorer" },
      { text: "Simplifying processes or designs to their essential, elegant form.", archetype: "Minimalist" },
    ],
  },
  {
    id: 3,
    text: "In a team setting, I naturally gravitate towards... (Select all that apply)",
    options: [
      { text: "Ensuring everyone understands the concepts and processes; creating documentation.", archetype: "Educator" },
      { text: "Generating innovative ideas and pushing the creative boundaries.", archetype: "Creator" },
      { text: "Taking on the technical implementation tasks, building the core components.", archetype: "Builder" },
      { text: "Finding and sharing the best tools, articles, or data to support the team's work.", archetype: "Curator" },
      { text: "Facilitating communication, offering support, and mentoring team members.", archetype: "Guide" },
      { text: "Proposing experimental approaches or investigating new potential solutions.", archetype: "Explorer" },
      { text: "Streamlining workflows, removing bottlenecks, and focusing on efficiency.", archetype: "Minimalist" },
    ],
  },
  {
    id: 4,
    text: "When I think about creating 'value' with a digital product/service, I prioritize... (Select all that apply)",
    options: [
      { text: "Empowering users with knowledge and clear understanding.", archetype: "Educator" },
      { text: "Offering a unique, novel, or aesthetically pleasing experience.", archetype: "Creator" },
      { text: "Providing a reliable, functional tool that solves a specific problem effectively.", archetype: "Builder" },
      { text: "Delivering a curated, high-quality selection of information or items.", archetype: "Curator" },
      { text: "Offering personalized support and guidance to help users achieve their goals.", archetype: "Guide" },
      { text: "Enabling users to discover new things or experiment in exciting ways.", archetype: "Explorer" },
      { text: "Saving users time and effort through simplicity and focused functionality.", archetype: "Minimalist" },
    ],
  },
  {
    id: 5,
    text: "If I were to launch a digital product quickly, I'd be most excited to create... (Select all that apply)",
    options: [
      { text: "A clear, concise e-book or a short instructional video series.", archetype: "Educator" },
      { text: "A unique digital artwork, a short interactive story, or a distinctive brand asset.", archetype: "Creator" },
      { text: "A simple but functional script, a small utility app, or a working prototype.", archetype: "Builder" },
      { text: "A curated list of top resources, a swipe file, or a themed collection.", archetype: "Curator" },
      { text: "A 1-on-1 consultation offer, a small support group, or a helpful checklist.", archetype: "Guide" },
      { text: "An experimental web toy, a new type of content format, or a report on a new trend.", archetype: "Explorer" },
      { text: "A minimalist template, a single-purpose tool, or a highly efficient workflow guide.", archetype: "Minimalist" },
    ],
  },
   {
    id: 6,
    text: "My preferred way to tackle a complex problem involves... (Select all that apply)",
    options: [
      { text: "Breaking it down into fundamental principles and explaining these to others or myself.", archetype: "Educator" },
      { text: "Brainstorming unconventional solutions and imagining new approaches.", archetype: "Creator" },
      { text: "Designing and building a systematic, practical solution step-by-step.", archetype: "Builder" },
      { text: "Researching how others have solved similar problems and curating the best strategies.", archetype: "Curator" },
      { text: "Discussing the problem with those affected to understand their needs and guide them to a solution.", archetype: "Guide" },
      { text: "Trying out different, sometimes risky, approaches to see what works or what new insights emerge.", archetype: "Explorer" },
      { text: "Identifying the absolute root cause and finding the simplest, most direct way to resolve it.", archetype: "Minimalist" },
    ],
  },
  {
    id: 7,
    text: "When I'm learning a new skill or technology, I'm most likely to... (Select all that apply)",
    options: [
      { text: "Seek out structured courses or detailed explanations to build a solid foundational understanding.", archetype: "Educator" },
      { text: "Immediately think about how I can use it to create something new or express a unique idea.", archetype: "Creator" },
      { text: "Focus on how I can apply it to build practical tools or improve existing systems.", archetype: "Builder" },
      { text: "Gather various tutorials, articles, and examples, organizing the best ones for future reference.", archetype: "Curator" },
      { text: "Look for a mentor, a study group, or a community where I can get guidance and support.", archetype: "Guide" },
      { text: "Jump in and learn by doing, tinkering, and experimenting with its features.", archetype: "Explorer" },
      { text: "Learn only the essential parts I need to achieve a specific, immediate goal efficiently.", archetype: "Minimalist" },
    ],
  },
];

// Parsed from your CSV. Key: "ArchetypeA-ArchetypeB" (alphabetically sorted)
export const combinationsData = {
  "Creator-Educator": { name: "The Thought Leader", summary: "You combine the strengths of a Educator and a Creator. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive creator execution." },
  "Builder-Educator": { name: "The System Sage", summary: "You combine the strengths of a Educator and a Builder. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive builder execution." },
  "Curator-Educator": { name: "The Knowledge Curator", summary: "You combine the strengths of a Educator and a Curator. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive curator execution." },
  "Educator-Guide": { name: "The Learning Guide", summary: "You combine the strengths of a Educator and a Guide. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive guide execution." },
  "Educator-Explorer": { name: "The Learning Hacker", summary: "You combine the strengths of a Educator and a Explorer. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive explorer execution." },
  "Educator-Minimalist": { name: "The Efficient Teacher", summary: "You combine the strengths of a Educator and a Minimalist. This means you may thrive in work that leverages both structured educator thinking and flexible, responsive minimalist execution." },
  "Builder-Creator": { name: "The UX Engineer", summary: "You combine the strengths of a Builder and a Creator. This means you may thrive in work that leverages both structured builder thinking and flexible, responsive creator execution." },
  "Builder-Explorer": { name: "The Indie Hacker", summary: "You combine the strengths of a Builder and a Explorer. This means you may thrive in work that leverages both structured builder thinking and flexible, responsive explorer execution." },
  "Builder-Curator": { name: "The Automation Creator", summary: "You combine the strengths of a Builder and a Curator. This means you may thrive in work that leverages both structured builder thinking and flexible, responsive curator execution." },
  "Builder-Guide": { name: "The Tech Guide", summary: "You combine the strengths of a Builder and a Guide. This means you may thrive in work that leverages both structured builder thinking and flexible, responsive guide execution." },
  "Builder-Minimalist": { name: "The Product-First Minimalist", summary: "You combine the strengths of a Builder and a Minimalist. This means you may thrive in work that leverages both structured builder thinking and flexible, responsive minimalist execution." },
  "Creator-Curator": { name: "The Brand Architect", summary: "You combine the strengths of a Creator and a Curator. This means you may thrive in work that leverages both structured creator thinking and flexible, responsive curator execution." },
  "Creator-Guide": { name: "The Creative Guide", summary: "You combine the strengths of a Creator and a Guide. This means you may thrive in work that leverages both structured creator thinking and flexible, responsive guide execution." },
  "Creator-Minimalist": { name: "The Creator Nomad", summary: "You combine the strengths of a Creator and a Minimalist. This means you may thrive in work that leverages both structured creator thinking and flexible, responsive minimalist execution." },
  "Curator-Guide": { name: "The Research Coach", summary: "You combine the strengths of a Curator and a Guide. This means you may thrive in work that leverages both structured curator thinking and flexible, responsive guide execution." },
  "Curator-Explorer": { name: "The Trend Hunter", summary: "You combine the strengths of a Curator and a Explorer. This means you may thrive in work that leverages both structured curator thinking and flexible, responsive explorer execution." },
  "Curator-Minimalist": { name: "The Async Librarian", summary: "You combine the strengths of a Curator and a Minimalist. This means you may thrive in work that leverages both structured curator thinking and flexible, responsive minimalist execution." },
  "Explorer-Minimalist": { name: "The Lifestyle Hacker", summary: "You combine the strengths of a Explorer and a Minimalist. This means you may thrive in work that leverages both structured explorer thinking and flexible, responsive minimalist execution." },
  "Explorer-Guide": { name: "The Network Builder", summary: "You combine the strengths of a Explorer and a Guide. This means you may thrive in work that leverages both structured explorer thinking and flexible, responsive guide execution." },
  "Creator-Explorer": { name: "The Public Creator", summary: "You combine the strengths of a Explorer and a Creator. This means you may thrive in work that leverages both structured explorer thinking and flexible, responsive creator execution." },
  "Guide-Minimalist": { name: "The Quiet Leader", summary: "You combine the strengths of a Guide and a Minimalist. This means you may thrive in work that leverages both structured guide thinking and flexible, responsive minimalist execution." }
};

// Helper function to create a sorted key for looking up combinations
export function getCombinationKey(arch1, arch2) {
  if (!arch1 || !arch2) return null; // Should not happen if logic is correct
  return [arch1, arch2].sort().join('-');
}
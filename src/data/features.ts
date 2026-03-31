import {
  Newspaper,
  Gem,
  Briefcase,
  Wrench,
  BookOpen,
  GraduationCap,
  Calendar,
  Handshake,
} from "lucide-react";

export const features = [
  {
    id: "news-highlights",
    title: "News Highlights",
    subtitle: "Curated Web3 updates and project alphas",
    icon: Newspaper,
    purpose:
      "Position Compass as a trusted intelligence hub where users discover opportunities early, ecosystem movements, and high-signal updates without noise.",
    targetUsers: ["Crypto Beginners", "Airdrop Hunters", "Traders", "Web3 Researchers"],
    hooks: [
      { title: "FOMO Loop", description: "Users fear missing alpha" },
      { title: "Trust Loop", description: "Curated info reduces noise" },
      { title: "Habit Formation", description: "Daily check-in behavior" },
    ],
    howItWorks: [
      "In-house team researches trending opportunities",
      "High-quality alphas are selected and validated",
      "Displayed on homepage and dashboard feed",
      "Users consume, act, and share discoveries",
    ],
    monetization: ["Sponsored highlights", "Premium early alpha tier", "Affiliate/referral links"],
    futureExpansion: ["AI-personalized alpha feed", "Alpha score ranking system", "Wallet-based recommendations"],
  },
  {
    id: "alpha-corner",
    title: "Alpha Corner",
    subtitle: "Early-stage Web3 opportunities",
    icon: Gem,
    purpose:
      "A dedicated section for early-stage, high-potential Web3 opportunities before they become mainstream. Contributors submit alpha which undergoes internal validation and curation.",
    targetUsers: ["Advanced Users", "Degens / Alpha Hunters", "Contributors", "Researchers"],
    hooks: [
      { title: "Exclusivity", description: "Premium access feeling" },
      { title: "Status", description: "Being early brings recognition" },
      { title: "Anticipation", description: "Reward expectation drives engagement" },
    ],
    howItWorks: [
      "Early (First-Mover)",
      "Curated (Validated)",
      "Exclusive (High-Value)",
    ],
    monetization: ["Alpha success rate", "Engagement time", "Repeat visits"], // Mapped from success metrics for structure
    futureExpansion: ["Alpha leaderboard", "On-chain proof of calls", "Private alpha groups"],
  },
  {
    id: "earning-opportunities",
    title: "Earning Opportunities",
    subtitle: "Income-generating Web3 hub",
    icon: Briefcase,
    purpose:
      "A centralized hub for all income-generating opportunities in Web3. Help users make money directly from the ecosystem.",
    targetUsers: ["Job Seekers", "Freelancers", "Airdrop Hunters", "Bounty Hunters"],
    hooks: [
      { title: "Direct Reward Loop", description: "Immediate value perception" },
      { title: "Daily Checking", description: "Habit formation for new opportunities" },
    ],
    howItWorks: [
      "Partnership: Compass hosts bounties with projects",
      "Listings: Job listings & external opportunities",
      "Action: Users browse, apply & participate",
    ],
    monetization: ["Commission on hires", "Paid job listings", "Featured placements"],
    futureExpansion: ["On-chain work history and proof of work NFT profiles for verifiable credentials."],
  },
  {
    id: "skill-marketplace",
    title: "Skill Marketplace",
    subtitle: "Web3 talent infrastructure",
    icon: Wrench,
    purpose:
      "A talent marketplace showcasing Compass community skills and connecting them to Web3 projects. Turn Compass into a Web3 talent infrastructure layer.",
    targetUsers: ["Developers", "Designers", "Creators", "Founders"],
    hooks: [
      { title: "Economic Empowerment", description: "Direct income" },
      { title: "Identity", description: "Recognition & reputation" },
      { title: "Opportunity", description: "Access to projects" },
    ],
    howItWorks: [
      "Talent Listing: Talents list skills and experience",
      "Project Request: Projects submit request via form with budget",
      "Matching: Compass matches talent to projects",
      "Deal Facilitation: Compass facilitates the deal",
    ],
    monetization: ["Service commission", "Premium tiers", "Recruitment retainers"],
    futureExpansion: ["Jobs", "Revenue", "Talent"],
  },
  {
    id: "activities",
    title: "Activities",
    subtitle: "Blog ecosystem & content engine",
    icon: BookOpen,
    purpose:
      "A content engine showcasing insights, recognition, and storytelling in Web3. Position Compass as a media authority and culture builder.",
    targetUsers: ["Community Members", "Readers", "Writers", "Ecosystem Partners"],
    hooks: [
      { title: "Blockchain/Ecosystem of the Month", description: "Highlighting emerging ecosystems doing impactful work" },
      { title: "Web3 Discovery (Impact)", description: "Spotlighting individuals making meaningful contributions globally" },
      { title: "Voice of Impact (Monthly)", description: "Top contributors within Compass community" },
      { title: "Web3 News & Insights", description: "Major developments shaping the industry" },
    ],
    howItWorks: [
      "Position Compass as a media authority and culture builder in the Web3 space through quality content and storytelling."
    ],
    monetization: ["Sponsored articles", "Featured ecosystem placements", "SEO traffic monetization"],
    futureExpansion: ["Contributor rewards system", "Tokenized publishing rights", "Community editorial DAO"],
  },
  {
    id: "training-program",
    title: "Training Program",
    subtitle: "Educational courses & certification",
    icon: GraduationCap,
    purpose:
      "An educational system offering free live training and paid recorded courses. Educate the community and create scalable revenue.",
    targetUsers: ["Beginners", "Upskillers", "Career Switchers"],
    hooks: [
      { title: "Free to Paid", description: "Conversion funnel" },
      { title: "FOMO", description: "Fear of missing knowledge" },
    ],
    howItWorks: [
      "Live Training: Free via Telegram for community engagement",
      "Recorded Courses: Paid version on website for revenue",
    ],
    monetization: ["Low-cost courses", "Course bundles", "Certification programs"],
    futureExpansion: ["On-chain certificates: Verifiable credentials for course completion", "Skill-to-job pipeline: Direct connection from learning to employment"],
  },
  {
    id: "events",
    title: "Events",
    subtitle: "Web3 event discovery hub",
    icon: Calendar,
    purpose:
      "A hub for discovering and promoting Web3 events across Nigeria and Africa. Projects submit events, users discover and register.",
    targetUsers: ["Event Goers", "Founders", "Networkers", "Projects"],
    hooks: [
      { title: "Networking", description: "IRL connections" },
      { title: "Digital + Physical", description: "Hybrid experience" },
    ],
    howItWorks: [
      "Event Submission: Projects submit event details",
      "Discovery: Users browse and find events",
      "Registration: Users register for events",
    ],
    monetization: ["Paid promotion", "Ticketing fees", "Featured listings"],
    futureExpansion: ["Event NFTs and on-chain attendance tracking for verifiable participation."],
  },
  {
    id: "sponsorship-partnership",
    title: "Sponsorship & Partnership",
    subtitle: "B2B collaboration system",
    icon: Handshake,
    purpose:
      "A structured system for brands and projects to collaborate with Compass. Turn Compass into a B2B Web3 growth partner.",
    targetUsers: ["Web3 Brands", "Protocols", "Agencies", "Investors"],
    hooks: [
      { title: "Trust", description: "Confidence in Compass audience" },
      { title: "Access", description: "Entry to African Web3 market" },
      { title: "Growth", description: "Scalable partnership model" },
    ],
    howItWorks: [
      "Sponsored Ads: Banners and promotional content",
      "Training Partnerships: Co-branded educational programs",
      "Talent Outsourcing: Access to skilled community members",
      "Campaign Collaborations: Joint marketing initiatives",
    ],
    monetization: ["Sponsorship deals", "Marketing retainers", "Talent supply contracts"],
    futureExpansion: ["Turn Compass into a B2B Web3 growth partner, providing brands access to the African Web3 market."],
  },
];

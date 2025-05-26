
export const demoFunctions = [
  {
    id: 1,
    code: "ID",
    name: "Identify",
    description: "Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities."
  },
  {
    id: 2,
    code: "PR",
    name: "Protect", 
    description: "Develop and implement appropriate safeguards to ensure delivery of critical services."
  },
  {
    id: 3,
    code: "DE",
    name: "Detect",
    description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event."
  },
  {
    id: 4,
    code: "RS", 
    name: "Respond",
    description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident."
  },
  {
    id: 5,
    code: "RC",
    name: "Recover",
    description: "Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident."
  }
];

export const demoCategories = [
  {
    id: 1,
    functionId: 1,
    code: "ID.AM",
    name: "Asset Management",
    description: "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy."
  },
  {
    id: 2,
    functionId: 1,
    code: "ID.BE",
    name: "Business Environment", 
    description: "The organization's mission, objectives, stakeholders, and activities are understood and prioritized."
  },
  {
    id: 3,
    functionId: 2,
    code: "PR.AC",
    name: "Identity Management, Authentication and Access Control",
    description: "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices."
  },
  {
    id: 4,
    functionId: 2,
    code: "PR.AT",
    name: "Awareness and Training",
    description: "The organization's personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties."
  },
  {
    id: 5,
    functionId: 3,
    code: "DE.AE",
    name: "Anomalies and Events",
    description: "Anomalous activity is detected and the potential impact of events is understood."
  }
];

export const demoSubcategories = [
  {
    id: 1,
    categoryId: 1,
    code: "ID.AM-1",
    name: "Physical devices and systems within the organization are inventoried",
    description: "Hardware assets are tracked and maintained in an inventory system."
  },
  {
    id: 2,
    categoryId: 1,
    code: "ID.AM-2", 
    name: "Software platforms and applications within the organization are inventoried",
    description: "Software assets are tracked and maintained in an inventory system."
  },
  {
    id: 3,
    categoryId: 2,
    code: "ID.BE-1",
    name: "The organization's role in the supply chain is identified and communicated",
    description: "Understanding of organizational dependencies and critical functions."
  },
  {
    id: 4,
    categoryId: 3,
    code: "PR.AC-1",
    name: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
    description: "Identity lifecycle management processes are established."
  },
  {
    id: 5,
    categoryId: 4,
    code: "PR.AT-1",
    name: "All users are informed and trained",
    description: "Security awareness training is provided to all personnel."
  }
];

export const demoMaturitySummary = [
  {
    function_code: "ID",
    total_controls: 23,
    implemented: 18,
    not_implemented: 3,
    partially_implemented: 2
  },
  {
    function_code: "PR", 
    total_controls: 25,
    implemented: 15,
    not_implemented: 6,
    partially_implemented: 4
  },
  {
    function_code: "DE",
    total_controls: 13,
    implemented: 10,
    not_implemented: 2,
    partially_implemented: 1
  },
  {
    function_code: "RS",
    total_controls: 16,
    implemented: 8,
    not_implemented: 5,
    partially_implemented: 3
  },
  {
    function_code: "RC",
    total_controls: 14,
    implemented: 6,
    not_implemented: 6,
    partially_implemented: 2
  }
];

export const demoAssessments = [
  {
    id: 1,
    subcategoryId: 1,
    status: "Implemented",
    owner: "IT Security Team",
    dueDate: "2024-12-31",
    comments: "Asset inventory system fully deployed and operational"
  },
  {
    id: 2,
    subcategoryId: 2,
    status: "Partially Implemented", 
    owner: "IT Operations",
    dueDate: "2025-03-15",
    comments: "Software inventory in progress, 70% complete"
  },
  {
    id: 3,
    subcategoryId: 3,
    status: "Not Implemented",
    owner: "Risk Management",
    dueDate: "2025-06-30", 
    comments: "Supply chain mapping initiative planned for Q2"
  },
  {
    id: 4,
    subcategoryId: 4,
    status: "Implemented",
    owner: "Identity Management Team",
    dueDate: "2024-11-30",
    comments: "Active Directory integration complete"
  },
  {
    id: 5,
    subcategoryId: 5,
    status: "Partially Implemented",
    owner: "HR Department",
    dueDate: "2025-02-28",
    comments: "Annual training program 60% rollout complete"
  }
];

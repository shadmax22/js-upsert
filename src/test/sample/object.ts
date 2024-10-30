export const companyDetails = {
  name: "Tech Innovators Inc.",
  address: {
    street: "1234 Innovation Drive",
    city: "Tech City",
    zip: "56789",
    country: "USA",
  },
  departments: {
    engineering: {
      manager: {
        name: "Alice Johnson",
        role: "Engineering Manager",
        email: "alice.johnson@techinnovators.com",
      },
      employees: [
        {
          name: "Bob Smith",
          role: "Software Engineer",
          email: "bob.smith@techinnovators.com",
          projects: [
            {
              name: "Project Alpha",
              deadline: "2024-12-01",
              status: "In Progress",
            },
            {
              name: "Project Beta",
              deadline: "2024-11-15",
              status: "Completed",
            },
          ],
        },
        {
          name: "Carol Williams",
          role: "DevOps Engineer",
          email: "carol.williams@techinnovators.com",
          projects: [
            {
              name: "Project Gamma",
              deadline: "2025-02-28",
              status: "Planning",
            },
          ],
        },
      ],
    },
    hr: {
      manager: {
        name: "David Brown",
        role: "HR Manager",
        email: "david.brown@techinnovators.com",
        profile: {
          id: { g: "green" },
        },
      },
      employees: [
        {
          name: "Eve Davis",
          role: "Recruiter",
          email: "eve.davis@techinnovators.com",
          projects: [
            {
              name: "Employee Retention Initiative",
              deadline: "2024-10-30",
              status: "In Progress",
            },
          ],
        },
      ],
    },
  },
};

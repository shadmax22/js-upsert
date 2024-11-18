export declare const companyDetails: {
    name: string;
    address: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
    departments: {
        engineering: {
            manager: {
                name: string;
                role: string;
                email: string;
            };
            employees: {
                name: string;
                role: string;
                email: string;
                projects: {
                    name: string;
                    deadline: string;
                    status: string;
                }[];
            }[];
        };
        hr: {
            manager: {
                name: string;
                role: string;
                email: string;
                profile: {
                    id: {
                        g: string;
                    };
                };
            };
            employees: {
                name: string;
                role: string;
                email: string;
                projects: {
                    name: string;
                    deadline: string;
                    status: string;
                }[];
            }[];
        };
    };
};

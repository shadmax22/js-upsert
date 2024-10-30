import { describe, expect, it } from "vitest";
import { set } from "../set";
import { upsert } from "../upsert";
import { companyDetails } from "./sample/object";

describe("App", () => {
  it("Key Update", () => {
    const updated = upsert(companyDetails, { name: set("My Company") });
    expect(updated.name).toBe("My Company");
  });
  it("Multiple Key Update", () => {
    const updated = upsert(
      companyDetails,
      {
        departments: {
          hr: {
            manager: set({
              ...companyDetails.departments.hr.manager,
              profile: {
                id: {
                  g: "green",
                },
              },
            }),
            employees: set.keys("g", "f"),
          },
        },
      },
      { departments: set.keys("hr", "manager", "name", "Davidx") }
    );

    expect(updated.departments.hr.manager.profile.id.g).toBe("green");
    expect(updated.departments.hr.manager.name).toBe("David");
  });
  it("Index updating", () => {
    const updated = upsert(companyDetails, {
      departments: {
        hr: {
          manager: {
            name: set("gh"),
            role: set("gh"),
          },
        },
      },
    });
    // expect(updated.departments.hr.manager.name).toBe("David");
  });
});

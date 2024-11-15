import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { set } from "../src/set.js";
import { upsert } from "../src/upsert.js";
import { companyDetails } from "./sample/object.js";

import { MainContainer } from "./react/MainContainer.js";
describe("upsert core", () => {
  it("Key Update", () => {
    const updated = upsert(companyDetails, { name: set("My Company") });
    expect(updated.name).toBe("My Company");
  });
  it("Multiple Key Update with using `At` ", () => {
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
            employees: set.at("g", "f"),
          },
        },
      },
      { departments: set.at("hr", "manager", "name", "David") }
    );

    expect(updated.departments.hr.manager.profile.id.g).toBe("green");
    expect(updated.departments.hr.manager.name).toBe("David");
  });
  it("Passing Function in set", () => {
    const updated = upsert(companyDetails, {
      address: set((pv) => ({ ...pv, city: "Mumbai" })),
    });

    expect(updated.address.city).toBe("Mumbai");
  });
  it("Passing Function in set `At` ", () => {
    const updated = upsert(companyDetails, {
      address: set.at("street", "Mumbai"),
    });

    expect(updated.address.street).toBe("Mumbai");
  });
  it("Updating value without nest", () => {
    const updated = upsert(companyDetails, set({ name: "Joe" }));

    expect(updated.name).toBe("Joe");
  });
  it("Updating value using setAt without nest", () => {
    const updated = upsert(companyDetails, set.at("address", "city", "Tech 2"));

    expect(updated.address.city).toBe("Tech 2");
  });
  it("Updating index value using setAt without nest", () => {
    const updated = upsert(
      { data: { id: 1, keys: [1, 2] } },
      set.at("data", "keys", 1, 2)
    );

    expect(updated.data.keys[1]).toBe(2);
  });
  it("Error Handling", () => {
    expect(() => {
      const updated = upsert(
        { data: { id: 1, keys: [1, 2] } },
        set.at("data", "keys", 1, 2, 3)
      );
      return updated.data.keys[1];
    }).toThrow(
      "Setting Failed at index 2 of [keys => 1 => 2] due to the type number, Only array or object is assignable"
    );
  });
  it("Known Issues Resolve", () => {
    const updated = upsert(companyDetails, {
      name: set("g"),
      ...set((prev) => prev),
    });

    expect(updated.name).toBe("g");
  });
});

describe("upsert with react", () => {
  it("useState update", () => {
    render(<MainContainer />);
    expect(screen.getByTestId("usestate-value").innerHTML).toBe("Test value");
  });
});

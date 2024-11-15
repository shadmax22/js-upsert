import { useEffect, useState } from "react";
import { upsert } from "../../src/upsert";
import { set } from "../../src/set";
import React from "react";

export function MainContainer() {
  const [state, setState] = useState({
    data: {
      green: "Gewwn",
    },
  });

  useEffect(() => {
    setState(
      upsert(state, {
        data: {
          green: set("Test value"),
        },
      })
    );
  }, [state?.data]);

  return (
    <>
      <h1 data-testid={"usestate-value"}>{state?.data?.green}</h1>
    </>
  );
}

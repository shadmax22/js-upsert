import { useEffect, useState } from "react";
import { upsert } from "../../upsert";
import { set } from "../../set";

export function MainContainer() {
  const [state, setState] = useState({});

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
      <h1>{state?.data?.green}</h1>
    </>
  );
}

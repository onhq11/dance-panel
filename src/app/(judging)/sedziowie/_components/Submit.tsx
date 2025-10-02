"use client";

import Button from "@/prettylab/core/src/components/layout/Button/Button";
import { PiCheck } from "react-icons/pi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { SetState } from "@/prettylab/core/src/types/SetState";

type Props = {
  submitted: boolean;
  setSubmitted: SetState;
};

export default function Submit({ submitted, setSubmitted }: Props) {
  const submittedProps = {
    color: "disabled",
    startIcon: <RiArrowGoBackLine />,
  };

  const notSubmittedProps = {
    color: "success",
    startIcon: <PiCheck />,
  };

  return (
    // @ts-ignore
    <Button
      {...(submitted ? submittedProps : notSubmittedProps)}
      onClick={() => setSubmitted((prev: any) => !prev)}
      variant="contained"
    >
      {submitted ? "Wróć do edycji" : "Zatwierdź zmiany"}
    </Button>
  );
}

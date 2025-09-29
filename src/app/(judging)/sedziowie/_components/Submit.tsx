"use client";

import Button from "@/components/Layout/Button";
import { PiCheck } from "react-icons/pi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { SetState } from "@/types/common";

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

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Label({ children }: Props) {
  return (
    <span
      style={{
        textTransform: "uppercase",
        color: "#fff",
        fontSize: 13,
        paddingLeft: "25px",
        marginBottom: "5px",
        marginTop: "35px",
      }}
    >
      {children}
    </span>
  );
}

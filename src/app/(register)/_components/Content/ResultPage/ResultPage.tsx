import { Typography } from "@mui/material";
import { registrationType } from "@/assets/data/registrationType";
import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import Button from "@/prettylab/core/components/layout/Button/Button";
import SlideIn from "@/prettylab/core/components/animation/SlideIn/SlideIn";

type Props = {
  type: string;
  handleReset: () => void;
};

export default function ResultPage({ type, handleReset }: Props) {
  return (
    <SlideIn>
      <Flex column>
        <Typography
          sx={{
            fontSize: 20,
          }}
        >
          Pomyślnie zarejestrowano{" "}
          {type === registrationType.solo ? "solistę" : "formację"}. Witamy w
          turnieju!
        </Typography>
        <Flex column sx={{ gap: 2, mt: 8 }}>
          <Typography>
            Jeżeli jeszcze nie było okazji, aby zajrzeć do regulaminu. Zachęcamy
            do przeczytania teraz!
          </Typography>
          <Button
            variant="outlined"
            href="/regulamin.pdf"
            target="_blank"
            sx={{ width: "100%" }}
          >
            Zobacz regulamin
          </Button>
        </Flex>
        <Flex column sx={{ gap: 2, mt: 8 }}>
          <Typography>
            A może chcesz zarejestrować jeszcze kogoś? Nie ma problemu, wróć do
            formularza i wypełnij go ponownie!
          </Typography>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ width: "100%" }}
          >
            Powrót do formularza
          </Button>
        </Flex>
        <Flex column sx={{ gap: 2, mt: 8 }}>
          <Typography>
            W razie wątpliwości lub pytań, skontaktuj się z nami telefonicznie
            <br />
            <span style={{ fontSize: 12 }}>Monika Kocoń 667 776 009</span>
          </Typography>
          <Button
            variant="outlined"
            href="tel:+48667776009"
            sx={{ width: "100%" }}
          >
            Zadzwoń do nas
          </Button>
        </Flex>
      </Flex>
    </SlideIn>
  );
}

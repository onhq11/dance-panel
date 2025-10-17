"use client";

import Flex from "@prettylab/core/components/layout/Flex/Flex";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import { list, remove } from "@prettylab/core/utils/api/crud";
import CreateModal from "@/app/(management)/zawody/CreateModal";
import { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";
import { useSnackbar } from "notistack";

export default function Page() {
  const [data, setData] = useState<Array<any>>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const res = await list("http://localhost:4000/api/competition");
      return res.data;
    };

    fetchData().then((res) => {
      setData(res);
    });
  }, [reloadData]);

  return (
    <Flex column sx={{ gap: 2 }}>
      <CreateModal reloadTable={() => setReloadData((prev) => !prev)} />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
              <TableCell>Zaczynają się dnia</TableCell>
              <TableCell>Aktywne</TableCell>
              <TableCell>Rejestracja otwarta</TableCell>
              <TableCell align="right">Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.starts_at}</TableCell>
                <TableCell>{row.is_active ? "Tak" : "Nie"}</TableCell>
                <TableCell>
                  {row.is_registration_open ? "Tak" : "Nie"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={async () => {
                      await remove(
                        "http://localhost:4000/api/competition",
                        row.id,
                      );
                      enqueueSnackbar("Pomyślnie usunięto", {
                        variant: "info",
                      });
                      setReloadData((prev) => !prev);
                    }}
                  >
                    <PiTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Flex>
  );
}

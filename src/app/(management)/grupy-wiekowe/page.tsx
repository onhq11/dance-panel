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
import CreateModal from "@/app/(management)/grupy-wiekowe/CreateModal";
import { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";
import { useSnackbar } from "notistack";

export default function Page() {
  const [data, setData] = useState<Array<any>>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const res = await list("http://localhost:4000/api/age-group");
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
              <TableCell>Miejsca</TableCell>
              <TableCell align="right">Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.seats}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={async () => {
                      await remove(
                        "http://localhost:4000/api/age-group",
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

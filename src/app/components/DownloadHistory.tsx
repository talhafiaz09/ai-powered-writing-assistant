"use client";

import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IHistory } from "../types";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";

export default function DownloadHistory({ data }: { data: IHistory[] }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);
        let generateText = "";
        data.forEach((obj, index) => {
            generateText += `${index + 1}) Created at: ${dayjs(obj.created).format(
                "DD/MM/YYYY HH:mm"
            )}\nOld text: ${obj.oldText}\nGenerated text: ${obj.generatedText}\n\n`;
        });
        const blob = new Blob([generateText], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setLoading(false);
    };

    return (
        <Box>
            {!!data?.length &&
                (loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignSelf: "center",
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress data-testid="loader" color="warning" />
                    </Box>
                ) : (
                    <IconButton data-testid="download" onClick={handleDownload}>
                        <DownloadIcon color="success" sx={{ fontSize: 28 }} />
                    </IconButton>
                ))}
        </Box>
    );
}

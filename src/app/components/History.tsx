"use client";

import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IHistory } from "../types";
import GenerateText from "./GeneratedText";
import DownloadHistory from "./DownloadHistory";
import { DATA_STORAGE_KEY } from "../utils";

export default function History({
    data,
    setData,
}: {
    data: IHistory[];
    setData: (value: IHistory[]) => void;
}) {
    const handleDelete = (index: number) => {
        const remove = data.filter((_, i) => index !== i);
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(remove));
        setData([...remove]);
    };
    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                    History
                </Typography>
                <DownloadHistory data={data} />
            </Box>
            {data.length ? (
                [...data].map((item, index) => (
                    <Box
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: 2,
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            padding: 2,
                            marginBottom: 3,
                        }}
                        key={index}
                    >
                        <GenerateText
                            generatedText={item.generatedText}
                            oldText={item.oldText}
                            loading={false}
                            showTitle={false}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                maxWidth: "15%",
                                textTransform: "none",
                                alignSelf: "flex-end",
                                marginTop: 2,
                            }}
                            color="error"
                            onClick={() => handleDelete(index)}
                        >
                            Delete
                        </Button>
                    </Box>
                ))
            ) : (
                <Box>
                    <Typography sx={{ color: "#333", textAlign: "center" }}>
                        Nothing to show!
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

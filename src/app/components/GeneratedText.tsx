"use client";

import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Explanation from "./Explanation";
import { GenerateTextProps } from "../types";

export default function GenerateText({
    generatedText,
    oldText,
    loading,
    showTitle = true,
    showExplain,
    error,
}: GenerateTextProps) {
    return (
        <Box>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        alignSelf: "center",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="warning" />
                    <Typography gutterBottom sx={{ color: "#333", fontSize: 14 }}>
                        Generating results
                    </Typography>
                </Box>
            )}
            {error && (
                <Box
                    sx={{
                        display: "flex",
                        alignSelf: "center",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography gutterBottom sx={{ color: "#333", fontSize: 14 }}>
                        {error}
                    </Typography>
                </Box>
            )}
            {generatedText && !loading && (
                <Box>
                    {showTitle && (
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#333" }}
                        >
                            Results:
                        </Typography>
                    )}
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 2,
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: 10,
                            },
                        }}
                    >
                        <Table sx={{ borderRadius: 5 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#9EDF9C" }}>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            width: "50%",
                                            fontWeight: "bold",
                                            fontSize: 16,
                                        }}
                                    >
                                        Original
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid #ddd",
                                            width: "50%",
                                            fontWeight: "bold",
                                            fontSize: 16,
                                        }}
                                    >
                                        Rewritten
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ border: "1px solid #ddd", width: "50%" }}>
                                        {oldText}
                                    </TableCell>
                                    <TableCell sx={{ border: "1px solid #ddd", width: "50%" }}>
                                        {generatedText}
                                    </TableCell>
                                </TableRow>
                                {showExplain && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            sx={{ border: "1px solid #ddd", width: "50%" }}
                                        >
                                            <Explanation
                                                generatedText={generatedText}
                                                oldText={oldText}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
}

"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ExplanationProps } from "../types";

export default function Explanation({ generatedText, oldText }: ExplanationProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [explanation, setExplanation] = useState("");

    const getExplanation = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/generate-text-comparison", {
                originalText: oldText,
                rewrittenText: generatedText,
            });
            setExplanation(response.data.explanation);
        } catch (err) {
            console.log("Error generating text:", err);
            setError("Failed to generate text, please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box>
            {loading ? (
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
                    <Typography gutterBottom sx={{ color: "#333", fontSize: 14 }}>
                        Loading explanation...
                    </Typography>
                </Box>
            ) : explanation ? (
                <>
                    <Typography fontSize={14} fontWeight={"bold"}>
                        Explanation:
                    </Typography>
                    <Typography fontSize={14}>{explanation}</Typography>
                </>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        sx={{
                            maxWidth: "15%",
                            textTransform: "none",
                        }}
                        color="warning"
                        onClick={getExplanation}
                    >
                        Explain
                    </Button>
                </Box>
            )}
        </Box>
    );
}

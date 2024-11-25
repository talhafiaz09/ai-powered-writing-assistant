"use client";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import GenerateText from "./components/GeneratedText";
import History from "./components/History";
import { DATA_STORAGE_KEY } from "./utils";
import { IHistory } from "./types";

const Home = () => {
    const [text, setText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<IHistory[]>([]);
    const [options, setOptions] = useState({ tone: "", length: "" });

    const handleGenerate = async () => {
        if (!text) {
            setError("Write something in the field!");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/generate-text", {
                text: generateTextWithFilters({
                    tone: options.tone,
                    length: options.length,
                    sentence: text,
                }),
            });
            const getData = localStorage.getItem(DATA_STORAGE_KEY);
            const newData = {
                oldText: text,
                generatedText: response.data.text,
                created: new Date().toString(),
            };
            if (!getData) {
                localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify([newData]));
                setData([newData]);
            } else {
                const parsedData = JSON.parse(getData);
                localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify([newData, ...parsedData]));
                setData([newData, ...parsedData]);
            }
            setGeneratedText(response.data.text);
        } catch (err) {
            setError("Failed to generate text, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const overrideClasses = {
        "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: "success.main",
            "& fieldset": {
                borderColor: "success.main",
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "success.main",
        },
    };

    const generateTextWithFilters = ({
        tone,
        length,
        sentence,
    }: {
        tone: string;
        length: string;
        sentence: string;
    }) => {
        let newSentence = `Rewrite the following sentence `;
        if (tone) {
            newSentence += `in a ${tone} tone `;
        }
        if (length) {
            newSentence += `making it ${length} `;
        }
        newSentence += `: ${sentence}`;

        return newSentence;
    };

    useEffect(() => {
        const initialValue = localStorage.getItem(DATA_STORAGE_KEY);
        if (initialValue) {
            setData(JSON.parse(initialValue));
        }
    }, []);

    return (
        <Box
            sx={{
                padding: 2,
                paddingLeft: { xs: 2, sm: 15 },
                paddingRight: { xs: 2, sm: 15 },
            }}
        >
            <Grid container spacing={2} columns={6}>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Autocomplete
                        disablePortal
                        data-testid="tone"
                        value={{ label: options.tone, value: options.tone }}
                        options={[
                            { label: "Formal", value: "Formal" },
                            { label: "Casual", value: "Casual" },
                            { label: "Persuasive", value: "Persuasive" },
                        ]}
                        onChange={(e, value) =>
                            setOptions((prev) => {
                                return { ...prev, tone: value?.value ? value.value : "" };
                            })
                        }
                        sx={{ flex: 1, mr: 1, ...overrideClasses }}
                        renderInput={(params) => <TextField {...params} label="Tone" />}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Autocomplete
                        disablePortal
                        data-testid="length"
                        value={{ label: options.length, value: options.length }}
                        options={[
                            { label: "Shorter", value: "Shorter" },
                            { label: "Longer", value: "Longer" },
                            { label: "Concise", value: "Concise" },
                        ]}
                        onChange={(e, value) =>
                            setOptions((prev) => {
                                return { ...prev, length: value?.value ? value.value : "" };
                            })
                        }
                        sx={{
                            flex: 1,
                            ...overrideClasses,
                        }}
                        renderInput={(params) => <TextField {...params} label="Length" />}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        data-testid="textField"
                        label="Write something...."
                        variant="outlined"
                        value={text}
                        disabled={loading}
                        onChange={(e) => setText(e.target.value)}
                        maxRows={4}
                        multiline
                        sx={{
                            ...overrideClasses,
                            width: "100%",
                        }}
                    />
                </Grid>
                <Grid size={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        data-testid="rewrite"
                        disabled={!text || loading}
                        sx={{
                            maxWidth: "15%",
                            textTransform: "none",
                            height: 50,
                        }}
                        color="success"
                        onClick={handleGenerate}
                    >
                        Rewrite
                    </Button>
                </Grid>
                <Grid size={6}>
                    <GenerateText
                        generatedText={generatedText}
                        oldText={text}
                        loading={loading}
                        error={error}
                        showExplain
                    />
                </Grid>
                <Grid size={6}>
                    <History data={data} setData={setData} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;

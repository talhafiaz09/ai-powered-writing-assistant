"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        width: "90vw",
    },
}));

const Img = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    marginTop: theme.spacing(4),
}));

const Error500 = () => {
    const router = useRouter();

    return (
        <Box className="content-center">
            <Box
                sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <BoxWrapper>
                    <Typography variant="h4" sx={{ mb: 2, color: "text.secondary" }}>
                        Internal Server Error :(
                    </Typography>
                    <Typography sx={{ mb: 6, color: "text.secondary" }}>
                        Oops! 😖 Something went wrong.
                    </Typography>
                    <Button onClick={() => router.replace("/")} variant="contained" color="error">
                        Back to Home
                    </Button>
                </BoxWrapper>
                <Img width="500" alt="error-illustration" src="/page-misc-error-light.png" />
            </Box>
        </Box>
    );
};

export default Error500;

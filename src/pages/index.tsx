import ExperienceSection from "@/components/page-components/index-page/ExperienceSection";
import GreetingSection from "@/components/page-components/index-page/GreetingsSection";
import TechnologyStack from "@/components/page-components/index-page/TechnologyStackSection";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  const tooSmall = useMediaQuery(`(max-width:${752}px)`);

  return (
    <Stack direction="column" position="relative">
      <Link
        to="https://www.linkedin.com/in/naufal-sani/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          sx={{ position: "absolute", top: 60, right: tooSmall ? 20 : 60 }}
        >
          Say Hi!
        </Button>
      </Link>
      <GreetingSection />
      <ExperienceSection />
      <TechnologyStack />
      <Typography
        sx={{ mt: 8, mb: 8 }}
        textAlign="center"
        variant="Title3Regular"
        fontStyle="italic"
      >
        Another component is still under development
      </Typography>
    </Stack>
  );
};

export default MainPage;

import ExperienceSection from "@/components/page-components/index-page/ExperienceSection";
import GreetingSection from "@/components/page-components/index-page/GreetingsSection";
import { Stack, Typography } from "@mui/material";

const MainPage = () => {
  return (
    <Stack direction="column" maxWidth={800}>
      <GreetingSection />
      <ExperienceSection />
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

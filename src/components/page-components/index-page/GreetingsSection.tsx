import StyleConstant from "@/utils/common/StyleConstant.Common";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";

import MyImg from "@/assets/images/afalsani.png";
import LayoutMaxWidth from "@/components/common/layout/LayoutMaxWidth";

const GreetingSection = () => {
  const tooSmall = useMediaQuery(`(max-width:${580}px)`);

  return (
    <LayoutMaxWidth>
      <Box
        mt={16}
        mb={16}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        <Typography
          variant="Title1Bold"
          sx={{
            background: `linear-gradient(to top right, #4B5D89, #769DEB)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
            "&::before": {
              content: '"Software Engineer"',
              position: "absolute",
              left: -8,
              bottom: -8,
              zIndex: -1,
              background:
                "linear-gradient(to top right, rgba(126, 153, 216, 0.2), rgba(148, 181, 248, 0.2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          Software Developer
        </Typography>
        <Stack direction="row" mt={3} alignItems="center" spacing={4}>
          <Typography variant="Title2Regular" textAlign="center">
            Provides Solution
          </Typography>
          <div
            style={{
              width: 12,
              height: 12,
              background: StyleConstant.BLACK,
              borderRadius: 6,
            }}
          />
          <Typography variant="Title2Regular" textAlign="center">
            Develops Solution
          </Typography>
        </Stack>
        <Card sx={{ mt: 6, pt: 4, pb: 4 }}>
          <Stack
            direction={tooSmall ? "column" : "row"}
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <img src={MyImg} height={105} width={141} alt="Naufal Sani" />
            <Stack maxWidth={495} spacing={2}>
              <Typography variant="Title3Bold" textAlign="center">
                Hi! I’m Sani. Nice to meet you.
              </Typography>
              <Typography variant="body">
                Engineering process starts with defining what the problem is,
                then starts constructing what kind of solution we can build.
                Throughout my career & education, I’ve gain lots of experiences
                in problem solving & met amazing people to collaborate with. I
                have a dream one day to build a product that helps solves many
                problem in this world.
              </Typography>
              <Typography variant="body">
                Connect with me by clicking the “Say Hi!” button at the right
                top of your screen. See you there 👋
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </LayoutMaxWidth>
  );
};

export default GreetingSection;

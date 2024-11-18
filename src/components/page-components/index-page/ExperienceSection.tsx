import ExperienceTile from "@/components/common/ExperienceTile";
import LayoutMaxWidth from "@/components/common/layout/LayoutMaxWidth";
import StyleConstant from "@/utils/common/StyleConstant.Common";
import { Stack, Typography } from "@mui/material";

import EYLogo from "@/assets/images/ey_logo.png";
import SamsungLogo from "@/assets/images/samsung_logo.png";
import CofounderieLogo from "@/assets/images/cofounderie_logo.png";
import TravelokaLogo from "@/assets/images/traveloka_logo.png";
import ImpactLogo from "@/assets/images/impact_logo.png";

const ExperienceSection = () => {
  return (
    <LayoutMaxWidth color={StyleConstant.BLACK}>
      <Stack spacing={5} mt={5} mb={5}>
        <Typography
          variant="Title2Bold"
          textAlign="center"
          sx={{
            background: `linear-gradient(to top right, ${StyleConstant.WHITE}, ${StyleConstant.BG})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Working Experience
        </Typography>
        <Typography
          variant="body"
          textAlign="center"
          sx={{
            background: `linear-gradient(to top right, ${StyleConstant.WHITE}, ${StyleConstant.BG})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          3 internships as a university student
          <br />2 full time job after graduation
        </Typography>
        <Stack direction="column" mt={3} mb={3} ml={2} mr={2} spacing={2}>
          {[
            {
              imgPath: EYLogo,
              title: "Solution Developer",
              companyName: "Ernst & Young",
              periodStart: new Date(2024, 3),
              periodEnd: undefined,
            },
            {
              imgPath: SamsungLogo,
              title: "Software Engineer",
              companyName: "Samsung R&D",
              periodStart: new Date(2023, 6),
              periodEnd: new Date(2024, 3),
            },
            {
              imgPath: CofounderieLogo,
              title: "Software Engineer Intern",
              companyName: "Confounderie",

              periodStart: new Date(2023, 3),
              periodEnd: new Date(2023, 6),
            },
            {
              imgPath: TravelokaLogo,
              title: "Backend Engineer Intern",
              companyName: "Traveloka",

              periodStart: new Date(2022, 7),
              periodEnd: new Date(2022, 11),
            },
            {
              imgPath: ImpactLogo,
              title: "Junior Odoo Developer Intern",
              companyName: "Impact.",

              periodStart: new Date(2022, 1),
              periodEnd: new Date(2022, 3),
            },
          ].map((item) => (
            <ExperienceTile
              imgPath={item.imgPath}
              title={item.title}
              companyName={item.companyName}
              periodStart={item.periodStart}
              periodEnd={item.periodEnd}
            />
          ))}
        </Stack>

        <Typography
          variant="body"
          color={StyleConstant.WHITE}
          textAlign="center"
          fontStyle="italic"
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "-40%",
            textDecorationSkipInk: "none",
          }}
        >
          Click the row to read the detail
        </Typography>
      </Stack>
    </LayoutMaxWidth>
  );
};

export default ExperienceSection;

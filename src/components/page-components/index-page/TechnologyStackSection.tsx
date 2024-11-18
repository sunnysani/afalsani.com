import StyleConstant from "@/utils/common/StyleConstant.Common";
import { Typography, Grid, Card, Stack } from "@mui/material";
import Code from "@/assets/svgs/code.svg";
import System from "@/assets/svgs/system.svg";
import { ReactNode } from "react";

interface TechnologyStackItem {
  icon: string; // SVG file from import
  title: string;
  description: ReactNode; // Rich empty node
  sections: {
    title: string;
    items: {
      label: string;
      starred?: boolean;
    }[];
  }[];
}

const myTechStacks: TechnologyStackItem[] = [
  {
    icon: Code,
    title: "Coding",
    description: (
      <>
        Brings&nbsp;<strong>structured</strong>&nbsp;and&nbsp;
        <strong>systemized.</strong>
        <br />
        Writes&nbsp;continuous&nbsp;for&nbsp;future&nbsp;Engineers.
      </>
    ),
    sections: [
      {
        title: "Frontend Framework",
        items: [
          {
            label: "Flutter (Android & iOS)",
            starred: true,
          },
          {
            label: "React (Web)",
            starred: true,
          },
          {
            label: "Svelte (Web)",
            starred: false,
          },
        ],
      },
      {
        title: "Backend Framework",
        items: [
          {
            label: "Springboot (Java)",
            starred: true,
          },
          {
            label: "Django (Python)",
            starred: true,
          },
          {
            label: "Go",
            starred: false,
          },
          {
            label: "NestJS (Javascript/Typescript)",
            starred: false,
          },
        ],
      },
      {
        title: "Documentation",
        items: [
          {
            label: "Swagger (API Contract)",
            starred: true,
          },
        ],
      },
    ],
  },
  {
    icon: System,
    title: "System",
    description: (
      <>
        Understands&nbsp;<strong>Computer&nbsp;System</strong>&nbsp;and&nbsp;
        <strong>Architecture</strong>.
        <br />
        Builds&nbsp;scalable&nbsp;&&nbsp;robust&nbsp;system&nbsp;is&nbsp;the&nbsp;first&nbsp;target.
      </>
    ),
    sections: [
      {
        title: "System Understanding",
        items: [
          {
            label: "Linux",
            starred: true,
          },
          {
            label: "Computer Network (Firewall, Protocol, CORS, etc)",
            starred: true,
          },
          {
            label: "TizenOS (Samsung)",
            starred: false,
          },
        ],
      },
      {
        title: "DevOps",
        items: [
          {
            label: "Docker/Containerization",
            starred: true,
          },
          {
            label: "Kubernetes",
            starred: false,
          },
          {
            label: "Terraform",
            starred: false,
          },
          {
            label: "Github Actions/Trigger/Webhook",
            starred: false,
          },
        ],
      },
      {
        title: "System Understanding",
        items: [
          {
            label: "AWS: ECS, CloudFront, ACM, S3, Route53, etc",
            starred: true,
          },
          {
            label: "Azure: Kubernetes, Jump Server, API Management, etc",
            starred: false,
          },
        ],
      },
    ],
  },
];

const TechnologyStack = () => (
  <div
    style={{
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      backgroundColor: StyleConstant.BG,
    }}
  >
    <Stack spacing={5} mt={5} mb={5}>
      <Typography
        variant="Title2Bold"
        textAlign="center"
        sx={{
          background: `linear-gradient(to top right, ${StyleConstant.BLACK}, #737373)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Technology Stack
      </Typography>
      <Typography
        variant="body"
        textAlign="center"
        sx={{
          background: `linear-gradient(to top right, ${StyleConstant.BLACK}, #737373)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Experienced in full stack development
        <br />
        Backend, Frontend, & Application
      </Typography>
      <Grid container>
        {myTechStacks.map((techStack) => (
          <Grid item xs={12} md={12} lg={6} p={1}>
            <Card
              sx={{
                m: "auto",
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <img src={techStack.icon} alt="Code" width={32} height={32} />
                  <Typography>{techStack.title}</Typography>
                </Stack>
                <Typography textAlign="center">
                  {techStack.description}
                </Typography>
                {techStack.sections.map((section) => (
                  <Stack width={360}>
                    <Typography
                      variant="Title4Bold"
                      color={StyleConstant.AMAZING_BLUE}
                    >
                      {section.title}:
                    </Typography>
                    <ul style={{ margin: "0 0 8px 0", paddingLeft: "16px" }}>
                      {section.items.map((item) => (
                        <li style={{ marginTop: 8 }}>
                          {item.label}
                          {item.starred && " ⭐️"}
                        </li>
                      ))}
                    </ul>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  </div>
);

export default TechnologyStack;

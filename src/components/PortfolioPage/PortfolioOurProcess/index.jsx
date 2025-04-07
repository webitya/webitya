"use client";

import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography } from '@mui/material';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const processSteps = [
  {
    title: "Discovery & Research",
    description: "We understand your brand, goals, and audience to craft the best strategy.",
    icon: <LightbulbIcon />,
  },
  {
    title: "Design & Development",
    description: "We create sleek, fast websites and marketing campaigns that convert.",
    icon: <DesignServicesIcon />,
  },
  {
    title: "Testing & Feedback",
    description: "We refine everything based on real feedback and make improvements.",
    icon: <WorkOutlineIcon />,
  },
  {
    title: "Launch & Growth",
    description: "We launch with confidence and continuously monitor to help you grow.",
    icon: <RocketLaunchIcon />,
  },
];

const PortfolioOurProcessSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
      <Timeline position="alternate">
        {processSteps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary">{step.icon}</TimelineDot>
              {index < processSteps.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" className="font-semibold">
                {step.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {step.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
};

export default PortfolioOurProcessSection;

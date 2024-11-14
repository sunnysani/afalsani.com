import StyleConstant from "@/utils/common/StyleConstant.Common";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";

interface ExperienceTileProps {
  imgPath: string;
  title: string;
  companyName: string;
  periodStart: Date;
  periodEnd?: Date;
}

const ExperienceTile = (props: ExperienceTileProps) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="start"
    >
      <img src={props.imgPath} width={32} height={32} alt={props.companyName} />
      <Stack mt={1} mb={1} direction="column">
        <Typography variant="Title3Bold" color={StyleConstant.WHITE}>
          {props.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="Title4Regular" color={StyleConstant.WHITE}>
            {props.companyName}
          </Typography>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: StyleConstant.WHITE,
            }}
          />
          <Typography
            variant="Title4Regular"
            color={StyleConstant.WHITE}
          >{`${format(props.periodStart, "MMMM yyyy")} - ${
            props.periodEnd ? format(props.periodEnd, "MMMM yyyy") : "Present"
          }`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ExperienceTile;

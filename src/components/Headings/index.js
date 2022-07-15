import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const Base = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  textDecoration: "none",
  color: theme.palette.text.primary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export const Title = (props) => {
  return <Base {...props} data-testid="title" />;
};

export const SubTitle = (props) => {
  const theme = useTheme();

  return (
    <Base
      style={{ color: theme.palette.text.secondary }}
      {...props}
      data-testid="subtitle"
    />
  );
};

import { Container, createStyles } from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar";
import UserSearch from "./UserSearch";

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBottom: "5rem",
    paddingTop: "0.5rem",
  },
  leftWrapper: {
    flex: 0.7,
    "@media (max-width: 700px)": {
      flex: 1,
    },
  },
}));

export const Search = () => {
  const { classes } = useStyles();
  return (
    <Container px={10} className={classes.wrapper}>
      <div className={classes.leftWrapper}>
        <UserSearch />
      </div>
      <Sidebar />
    </Container>
  );
};
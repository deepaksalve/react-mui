import React from "react";
import _debouced from "lodash/debounce";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RefreshIcon from "@mui/icons-material/Refresh";

import SearchBox from "../SearchBox";
import AddEmployeeModal from "../EmployeeFormModal";
import { ThemeToggle } from "../AppTheme";
import { updateFilter } from "../../store/filters-slice";
import { refreshUsers } from "../../store/users-slice";

export default function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRefresh = React.useCallback(() => {
    dispatch(refreshUsers({ results: 10 }));
  }, [dispatch]);

  const deboucedHandler = React.useMemo(
    () =>
      _debouced(() => {
        if (query) dispatch(updateFilter(query));
      }, 350),
    [query, dispatch]
  );

  React.useEffect(() => {
    deboucedHandler();

    return () => {
      deboucedHandler.cancel();
    };
  }, [deboucedHandler]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/">
            <HomeIcon />
          </Link>
          <SearchBox
            query={query}
            onSearch={() => {}}
            onBlur={(e) => setQuery("")}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleClickOpen}
              color="inherit"
            >
              <PersonAddAltIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ ml: 1 }} onClick={onRefresh} color="inherit">
              <RefreshIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      {open && <AddEmployeeModal isOpen onClose={handleClose} />}
    </Box>
  );
}

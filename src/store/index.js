import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users-slice";
import filtersReducer from "./filters-slice";

export default configureStore({
  reducer: {
    users: usersReducer,
    filters: filtersReducer,
  },
});

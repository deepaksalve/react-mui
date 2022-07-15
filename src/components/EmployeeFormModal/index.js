import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material";

import Dropdown from "../Dropdown";
import FormRadioGroup from "../FormRadioGroup";
import { addNewEmployee } from "../../store/users-slice";
import timezones from "../../config/timezones";
import { makeUser } from "../../utils/common";

const fields = [
  {
    required: true,
    name: "fname",
    label: "First Name",
    type: "text",
  },
  {
    required: true,
    name: "lname",
    label: "Last Name",
    type: "text",
  },
  {
    required: true,
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    required: true,
    name: "phone",
    label: "Primary contact no.",
    type: "text",
  },
  {
    required: true,
    name: "dob",
    label: "Date of Birth",
    type: "date",

    extras: {
      InputLabelProps: {
        shrink: true,
      },
    },
  },
  {
    required: true,
    name: "address",
    label: "Address",
    type: "text",
  },
];
export default function EmployeeFormModal({ employee = {}, isOpen, onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = React.useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    photo: "",
    timezone: "",
    ...employee,
  });
  const [formErrors, setFormErrors] = React.useState({
    fname: false,
    lname: false,
    email: false,
    phone: false,
    gender: false,
    address: false,
    photo: false,
    timezone: false,
  });

  const handleAvatarChange = React.useCallback((e) => {
    if (e.target.files) {
      const avatar = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setFormValues((v) => ({
          ...v,
          photo: reader.result,
        }));
        setFormErrors((v) => ({
          ...v,
          photo: false,
        }));
      });
      reader.readAsDataURL(avatar);
    }
  }, []);

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
    setFormErrors((v) => ({
      ...v,
      [name]: value.length < 1,
    }));
  }, []);

  const onSubmit = React.useCallback(
    (e) => {
      let isValid = true;
      for (let name in formValues) {
        if (!formValues[name]) {
          isValid = false;
          setFormErrors((v) => ({
            ...v,
            [name]: true,
          }));
        }
      }

      if (isValid) {
        const newEmp = makeUser(formValues);
        dispatch(addNewEmployee(newEmp));
        onClose();
      }
    },
    [formValues, dispatch, onClose]
  );

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>New Joinee</DialogTitle>
        <DialogContent>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {formValues.photo ? (
              <Avatar
                alt="new-joinee"
                src={formValues.photo}
                sx={{
                  width: 200,
                  height: 200,
                  [theme.breakpoints.down("md")]: {
                    width: 150,
                    height: 150,
                  },
                }}
              />
            ) : (
              <>
                <Input
                  type="file"
                  id="user-avatar"
                  sx={{ display: "none" }}
                  className="hidden-ip-avatar"
                  onChange={handleAvatarChange}
                />
                <InputLabel htmlFor="user-avatar">
                  <AccountCircleIcon
                    alt="new-joinee"
                    sx={{
                      cursor: "pointer",
                      width: 200,
                      height: 200,
                      [theme.breakpoints.down("md")]: {
                        width: 150,
                        height: 150,
                      },
                    }}
                  />
                </InputLabel>
              </>
            )}
          </Grid>
          {fields.map((f) => (
            <TextField
              fullWidth
              key={f.name}
              type={f.type}
              name={f.name}
              margin="dense"
              label={f.label}
              variant="standard"
              required={f.required}
              error={formErrors[f.name]}
              value={formValues[f.name]}
              onChange={handleInputChange}
              {...(f.extras || {})}
            />
          ))}
          <FormControl error={formErrors.gender}>
            <FormRadioGroup
              required
              id="gender"
              name="gender"
              label="Gender"
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "other", label: "Other" },
              ]}
              value={formValues.gender}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth error={formErrors.timezone}>
            <Dropdown
              required
              id="timezone"
              name="timezone"
              label="Timezone"
              options={timezones}
              value={formValues.timezone}
              onChange={handleInputChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

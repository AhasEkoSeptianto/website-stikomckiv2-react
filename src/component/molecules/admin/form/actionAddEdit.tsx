import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

type I_ActionAddEdit = {
  open: boolean;
  onClose: () => void;
  onConfirm: (form: any) => any;
  oldData: any;
  form: I_Form[];
  titleAction: string;
};

type I_Form = {
  name: any;
  label: string;
  icon?: any;
  type: string;
  dataSet?: I_DataSet[];
  required?: boolean;
};

type I_DataSet = {
  label: any;
  value: any;
};

export default function ActionAddEdit(props: I_ActionAddEdit) {
  var { open, onClose, onConfirm, oldData, form, titleAction } = props;

  const [loadingFetch, setLoadingFetch] = useState(false);
  const [dataForm, setForm] = useState<any>({});

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    status: "",
  });

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (open) {
      setOpenDrawer(true);
      if (oldData) {
        setForm(oldData);
      } else {
        //   make obj form
        var resObjForm = {};
        form.forEach((item) => {
          resObjForm = { ...resObjForm, [item.name]: "" };
        });
        setForm(resObjForm);
      }
    }
  }, [props]);

  const HandleChangeForm = (e: any) => {
    setForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const Submit = async (e: any) => {
    e.preventDefault();

    setLoadingFetch(true);

    await onConfirm(dataForm)
      .then((res: any) => {
        setAlert({ open: true, msg: res.data.msg, status: "success" });
        setOpenDrawer(false);
        onClose();
      })
      .catch((err: any) => {
        setAlert({ open: true, msg: err.response.data.msg, status: "error" });
      });
    setLoadingFetch(false);
  };

  const HandleCloseAlert = () => {
    setAlert({ open: false, status: "", msg: "" });
  };

  const HandleClose = () => {
    setOpenDrawer(false);
    onClose();
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.open}
        autoHideDuration={5000}
        onClose={HandleCloseAlert}
        key={"top" + "center"}
      >
        <Alert
          onClose={HandleCloseAlert}
          severity={alert.status === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
      <Drawer anchor="right" open={openDrawer} onClose={HandleClose}>
        <div className="w-96 p-5 h-full">
          <h3 className="font-semibold text-lg">{titleAction}</h3>
          <Divider />
          <form
            className="py-5 h-full flex flex-col justify-between"
            onSubmit={Submit}
          >
            <div className="space-y-2">
              {form.map((item, key) => (
                <Fragment>
                  <TextField
                    label={item.label}
                    variant="filled"
                    placeholder="type here.."
                    select={item.type === "select"}
                    name={item.name}
                    required={item.required}
                    type={item.type}
                    fullWidth
                    value={dataForm?.[item.name]}
                    onChange={HandleChangeForm}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {item.icon}
                        </InputAdornment>
                      ),
                    }}
                  >
                    {item.dataSet?.map((item, key) => (
                      <MenuItem key={key} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Fragment>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loadingFetch}
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      </Drawer>
    </Fragment>
  );
}

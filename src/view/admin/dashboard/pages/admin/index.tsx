import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Drawer,
  Divider,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import {
  N_AddAdmin,
  N_DeleteAdmin,
  N_EditAdmin,
  N_GetListAdmin,
} from "src/network/admin/admin";
import useSWR from "swr";

import AddIcon from "@mui/icons-material/Add";
import LoadingTable from "src/component/molecules/admin/loading/loadingTable";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import FilterTable from "src/component/molecules/admin/filterTable";
import { DeleteTableIcon, EditTableIcon } from "src/utils/constans/icon";


export default function AdminPage() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    name: "",
    email: "",
  });

  const [form, setForm] = useState({
    type: "add" || "edit",
    oldData: {},
    open: false,
  });

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    status: "success" || "failed",
  });

  const { data: listAdmin, error, mutate } = useSWR([params], N_GetListAdmin);

  const HandleCloseDrawer = () => {
    setForm({ ...form, open: false });
  };

  const HandleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const HandleEdit = (oldData: any) => {
    setForm({ type: "edit", oldData: oldData, open: true });
  };

  const HandleDelete = (oldData: any) => {
    Swal.fire({
      icon: "info",
      title: "Are You Sure ?",
      confirmButtonText: "Submit",
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async (res) => {
        await N_DeleteAdmin(oldData._id)
          .then((res) => {
            mutate();
            Swal.fire({ icon: "success", title: res?.data.msg, timer: 1500 });
          })
          .catch((err) => {
            Swal.fire({ icon: "success", title: err.response.data.msg });
          });
      },
    });
  };

  const HandleChangeFilter = (key: any, value: any) => {
    const defaults = { name: '', email: '' }
    setParams({ ...params, ...defaults, [key]: value })
  }

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

      <Drawer anchor="right" open={form.open} onClose={HandleCloseDrawer}>
        <FormActionAdmin
          setAlert={setAlert}
          onClose={HandleCloseDrawer}
          mutate={mutate}
          type={form.type}
          oldData={form.oldData}
        />
      </Drawer>

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">List Admin</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => setForm({ ...form, type: "add", open: true })}
        >
          Add Admin
        </Button>
      </div>
      

      <FilterTable
        filter={[
          {
            type: "search",
            selectOpt: [
              { label: "Name", value: "name", key: 'name' },
              { label: "Email", value: "email", key: 'name' },
            ],
            cb: HandleChangeFilter,
          },
        ]}
      />

      {!listAdmin && !error ? (
        <LoadingTable />
      ) : (
        <Fragment>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="font-bold">Name</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold">Email</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold">Phone Number</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold">Role</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold">Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAdmin?.data?.data?.map((item: any, idx: number) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <EditTableIcon onClick={() => HandleEdit(item)} />
                        <DeleteTableIcon onClick={() => HandleDelete(item)} />
                      </div>
                      
                      {/* <ModeEditIcon
                        className="cursor-pointer"
                        sx={{ width: 40, height: 40 }}
                        color="info"
                        onClick={() => HandleEdit(item)}
                      /> */}
                        {/* <DeleteIcon
                          className="cursor-pointer"
                          sx={{ width: 40, height: 40 }}
                          color="error"
                          onClick={() => HandleDelete(item)}
                        /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[1, 2, 3, 10, 25, 100]}
            component="div"
            count={listAdmin?.data?.rows}
            rowsPerPage={params.limit}
            page={params.page - 1}
            onPageChange={(e: any, newPage: any) =>
              setParams({ ...params, page: newPage + 1 })
            }
            onRowsPerPageChange={(e: any) =>
              setParams({ ...params, limit: e.target.value })
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
}

type IFormActionAdmin = {
  onClose: any;
  mutate: any;
  setAlert: any;
  oldData: any;
  type: any;
};
const FormActionAdmin = (props: IFormActionAdmin) => {
  const { onClose, mutate, setAlert, oldData, type } = props;

  const [loadingFetch, setLoadingFetch] = useState(false);
  const [form, setForm] = useState({
    name: type === "edit" ? oldData.name : "",
    email: type === "edit" ? oldData.email : "",
    phoneNumber: type === "edit" ? oldData.phoneNumber : "",
    role: type === "edit" ? oldData.role : "",
  });

  const HandleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Submit = async (e: any) => {
    e.preventDefault();

    setLoadingFetch(true);

    if (type === "edit") {
      await N_EditAdmin(form, oldData._id)
        .then((res) => {
          console.log(res.data);
          mutate();
          setAlert({ open: true, msg: res.data.msg, status: "success" });
          onClose();
        })
        .catch((err) => {
          console.log(err.response);
          setAlert({
            open: true,
            msg: err.response.data.msg,
            status: "failed",
          });
        });
    } else {
      await N_AddAdmin(form)
        .then((res) => {
          console.log(res.data);
          mutate();
          setAlert({ open: true, msg: res.data.msg, status: "success" });
          onClose();
        })
        .catch((err) => {
          console.log(err.response);
          setAlert({
            open: true,
            msg: err.response.data.msg,
            status: "failed",
          });
        });
    }

    setLoadingFetch(false);
  };

  return (
    <div className="w-96 p-5 h-full">
      <h3 className="font-semibold text-lg">
        {type === "add" ? "Add New" : "Edit"} Admin
      </h3>
      <Divider />

      <form
        className="py-5 h-full flex flex-col justify-between"
        onSubmit={Submit}
      >
        <div className="space-y-2">
          <TextField
            label="Full Name"
            variant="filled"
            placeholder="type fullname"
            name="name"
            fullWidth
            value={form.name}
            onChange={HandleChangeForm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            placeholder="type email"
            variant="filled"
            value={form.email}
            onChange={HandleChangeForm}
            name="email"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Phone Number"
            placeholder="type phonenumber"
            variant="filled"
            value={
              form.phoneNumber.includes("+62")
                ? parseInt(form.phoneNumber.replace("+62", ""))
                : parseInt(form.phoneNumber)
            }
            fullWidth
            name="phoneNumber"
            type="number"
            onChange={(e: any) =>
              setForm({ ...form, phoneNumber: `+62${e.target.value}` })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon /> +62
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Role"
            placeholder="type role"
            variant="filled"
            name="role"
            fullWidth
            value={form.role}
            onChange={HandleChangeForm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ManageAccountsIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button variant="contained" color="error" onClick={onClose}>
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
  );
};

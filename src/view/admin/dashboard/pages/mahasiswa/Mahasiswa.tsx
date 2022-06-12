import React from "react";

// router
import { Link } from "react-router-dom";

// css
import s from "./../../../../../asset/css/admin/dashboard/pages/mahasiswa/mahasiswa.module.css";

// material ui
import { Modal, Backdrop, Fade, MenuItem } from "@mui/material";

import { connect } from "react-redux";
import { post } from "src/lib/axios";
import { changeName } from "src/lib/changeFormName";

import { AiFillIdcard } from "react-icons/ai";
import { SiGooglescholar, SiGoogleclassroom } from "react-icons/si";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FcAddressBook } from "react-icons/fc";
import { MdGrade, MdOutlineDateRange } from "react-icons/md";

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
import { N_DELETEMahasiswa, N_GetListMahasiswa, N_POSTMahasiswa, N_PUTMahasiswa } from "src/network/admin/mahasiswa";
import moment from "moment";
import { TIMESTAMP_FORMAT_SHOW } from "src/utils/constans/TimestampFormat";
import { DeleteTableIcon, EditTableIcon } from "src/utils/constans/icon";
import { DatePicker } from "antd";

const Mahasiswa = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    nama: "",
    nim: "",
    jurusan: "",
    kelas: "",
    semester: "",
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

  const {
    data: listMahasiswa,
    error,
    mutate,
  } = useSWR([params], N_GetListMahasiswa);
  console.log(listMahasiswa);
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
        await N_DELETEMahasiswa(oldData._id)
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
    const defaults = { name: "", email: "" };
    setParams({ ...params, ...defaults, [key]: value });
  };

  const tableHeaders = [
    "Name",
    "Nim",
    "Jurusan",
    "Kelas",
    "No.telp",
    "Address",
    "Semester",
    "Tahun Ajaran",
    "Register At",
    "Last Updated",
    "Action",
  ];

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
        <h2 className="font-bold text-2xl">List Mahasiswa</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => setForm({ type: "add", open: true, oldData: {} })}
        >
          Add Mahasiswa
        </Button>
      </div>

      <FilterTable
        filter={[
          {
            type: "search",
            selectOpt: [
              { label: "Name", value: "name", key: "name" },
              { label: "Email", value: "email", key: "name" },
              { label: "Nim", value: "nim", key: "nim" },
            ],
            cb: HandleChangeFilter,
          },
        ]}
      />

      {!listMahasiswa && !error ? (
        <LoadingTable />
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((Headers, idx) => (
                    <TableCell key={idx}>
                      <span className="font-bold">{Headers}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listMahasiswa?.data?.data?.map((item: any, idx: number) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.nama}
                    </TableCell>
                    <TableCell>{item.nim}</TableCell>
                    <TableCell>{item.jurusan}</TableCell>
                    <TableCell>{item.kelas}</TableCell>
                    <TableCell>{item.notelp}</TableCell>
                    <TableCell>{item.alamat}</TableCell>
                    <TableCell>{item.semester}</TableCell>
                    <TableCell>{item.tahun_ajaran}</TableCell>
                    <TableCell>
                      {moment(item.createdAt).format(TIMESTAMP_FORMAT_SHOW)}
                    </TableCell>
                    <TableCell>
                      {moment(item.updatedAt).format(TIMESTAMP_FORMAT_SHOW)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <EditTableIcon onClick={() => HandleEdit(item)} />
                        <DeleteTableIcon onClick={() => HandleDelete(item)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 2, 3, 10, 25, 100]}
            component="div"
            count={listMahasiswa?.data?.rows}
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
};

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
  const [form, setForm] = useState<any>({
	nama: oldData.nama || '',
	nim: oldData.nim || '',
	jurusan: oldData.jurusan || '',
	kelas: oldData.kelas || '',
	notelp: oldData.notelp || '',
	alamat: oldData.alamat || '',
	semester: oldData.semester || '',
	tahun_ajaran: oldData.tahun_ajaran || ''
  });

  const HandleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const Submit = async (e: any) => {
    e.preventDefault();

    setLoadingFetch(true);



    if (type === "edit") {
      await N_PUTMahasiswa(form, oldData._id)
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
      await N_POSTMahasiswa(form)
        .then((res) => {          
			mutate();
          setAlert({ open: true, msg: res.data.msg, status: "success" });
          onClose();
        })
        .catch((err) => {
          setAlert({
            open: true,
            msg: err.response.data.msg,
            status: "failed",
          });
        });
    }

    setLoadingFetch(false);
  };
  console.log(oldData)
  const Form = [
    {
      name: "nama",
      label: "Name",
      value: "",
      icon: <AccountCircle />,
      type: "text",
    },
    {
      name: "jurusan",
      label: "Jurusan",
      icon: <SiGooglescholar size="100%" className="w-5 h-5" />,
      type: "select",
	  dataSet: [
		{ label: 'Teknik Informatika', value: 'teknik informatika' },
		{ label: 'Sistem Informasi', value: 'sistem informasi' }
	  ]
    },
    {
      name: "kelas",
      label: "Kelas",
      icon: <SiGoogleclassroom size="100%" className="w-5 h-5" />,
      type: "select",
	  dataSet: [
		{ label: 'Karyawan Sabtu', value: 'karyawan sabtu' },
		{ label: 'Reguler Malam', value: 'reguler malam' },
		{ label: 'Reguler Pagi', value: 'reguler pagi' },
		{ label: 'Shift', value: 'shift' },
	  ]
    },
    {
      name: "notelp",
      label: "No. Telp",
      icon: <span className="flex items-center"><BsFillTelephonePlusFill size="100%" className="w-5 h-5" />+62</span>,
      type: "number",
    },
    {
      name: "alamat",
      label: "Address",
      icon: <FcAddressBook size="100%" className="w-5 h-5" />,
      type: "text",
    },
    {
      name: "semester",
      label: "Semester",
      icon: <MdGrade size="100%" className="w-5 h-5" />,
      type: "number",
    },
  ];

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
          {Form.map((item, key) => (
            <Fragment>
              <TextField
                label={item.label}
                variant="filled"
                placeholder="type here.."
				select={item.type === 'select'}
                name={item.name}
				type={item.type}
                fullWidth
                value={form?.[item.name]}
                onChange={HandleChangeForm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {item.icon}
                    </InputAdornment>
                  )
                }}
              >
				{item.dataSet?.map((item, key) => (
					<MenuItem key={key} value={item.value} >
						{item.label}
					</MenuItem>
				))}
			  </TextField>
            </Fragment>
          ))}
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

const mapDispathToProps = (dispatch: any) => {
  return {
    changeNav: (nav: any) =>
      dispatch({ type: "change_navDashboard", nav: nav }),
  };
};

export default connect(null, mapDispathToProps)(Mahasiswa);

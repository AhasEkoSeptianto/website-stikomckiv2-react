import { connect } from "react-redux";
import { FcAddressBook } from "react-icons/fc";
import { AiTwotoneMail } from "react-icons/ai";

import { Button } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import useSWR from "swr";

import AddIcon from "@mui/icons-material/Add";

import AccountCircle from "@mui/icons-material/AccountCircle";

import Swal from "sweetalert2";
import FilterTable from "src/component/molecules/admin/filterTable";

import {
  N_GETDosen,
  N_POSTDosen,
  N_DELETEDosen,
  N_PUTDosen,
} from "src/network/admin/dosen";
import TableAdmin from "src/component/molecules/admin/table";
import ActionAddEdit from "src/component/molecules/admin/form/actionAddEdit";
import { BsFillTelephoneFill } from "react-icons/bs";
import { DeleteTableIcon, EditTableIcon } from "src/utils/constans/icon";

const ListDosen = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    nid: "",
    nama: "",
    email: "",
    notelp: "",
    alamat: ""
  });

  const [form, setForm] = useState({
    type: "add" || "edit",
    oldData: {},
    open: false,
    title: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    status: "success" || "failed",
  });

  const { data: listDosen, error, mutate } = useSWR([params], N_GETDosen);

  const HandleDelete = (oldData: any) => {
    Swal.fire({
      icon: "info",
      title: "Are You Sure ?",
      confirmButtonText: "Submit",
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async (res) => {
        await N_DELETEDosen(oldData._id)
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
    const defaults = { nid: "", nama: "", email: "", notelp: "", alamat: "" };
    setParams({ ...params, ...defaults, [key]: value });
  };

  const HandleActionForm = async (dataForm: any) => {
    let resp = {}

    if (form.type === 'add'){
      resp = await N_POSTDosen(dataForm);
    }else if(form.type === 'edit'){
      resp = await N_PUTDosen(dataForm, dataForm._id)
    }
    mutate()
    return resp;
  };

  const column = [
    { key: "nid", label: "NID" },
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "notelp", label: "No Telp" },
    { key: "alamat", label: "Alamat" },
    {
      key: "Action",
      label: "Action",
      render: function _(record: any) {
        return (
          <div className="flex items-center">
            <EditTableIcon onClick={() => setForm({ open: true, title: 'Add Dosen', type: 'edit', oldData: record })} />
            <DeleteTableIcon onClick={() => HandleDelete(record)} />
          </div>
        );
      },
    },
  ];

  const FormGroup = [
    {
      name: "nama",
      label: "Name",
      value: "",
      icon: <AccountCircle />,
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      value: "",
      icon: <AiTwotoneMail size="100%" className="w-5 h-5" />,
      type: "email",
      required: true,
    },
    {
      name: "notelp",
      label: "No Telp",
      value: "",
      icon: <BsFillTelephoneFill size="100%" className="w-5 h-5" />,
      type: "number",
      required: true,
    },
    {
      name: "alamat",
      label: "Address",
      icon: <FcAddressBook size="100%" className="w-5 h-5" />,
      type: "text",
      required: true,
    },
  ];

  return (
    <Fragment>
      <ActionAddEdit
        {...form}
        open={form.open}
        titleAction={form.title}
        form={FormGroup}
        onClose={() => setForm({ ...form, open: false })}
        onConfirm={HandleActionForm}
      />

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">List Dosen</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() =>
            setForm({
              type: "add",
              open: true,
              oldData: {},
              title: "Add Dosen",
            })
          }
        >
          Add Dosen
        </Button>
      </div>

      <FilterTable
        filter={[
          {
            type: "search",
            selectOpt: [
              { label: "NID", value: "nid", key: "nid" },
              { label: "Nama", value: "nama", key: "nama" },
              { label: "Email", value: "email", key: "email" },
              { label: "No. telp", value: "notelp", key: "notelp" },
              { label: "Alamat", value: "alamat", key: "alamat" },
            ],
            cb: HandleChangeFilter,
          },
        ]}
      />

      <TableAdmin
        column={column}
        data={listDosen?.data?.dosen}
        pagination={{
          page: params.page,
          limit: params.limit,
          onPageChange: (page) => console.log(page),
          onLimitChange: (limit) => console.log(limit),
          totalData: 999,
        }}
      />
    </Fragment>
  );
};

const mapDispathToProps = (dispatch: any) => {
  return {
    changeNav: (nav: any) =>
      dispatch({ type: "change_navDashboard", nav: nav }),
  };
};

export default connect(null, mapDispathToProps)(ListDosen);

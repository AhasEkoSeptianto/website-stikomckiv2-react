import { LoadingButton } from "@mui/lab";
import { Button, Divider, Drawer, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

type I_ActionAddEdit = {
    open: boolean,
    mutate: any,
    oldData: any,
    form: I_Form[],
    titleAction: string
}

type I_Form = {
    name: string,
    label: string,
    icon?: any,
    type: string,
    dataSet?: I_DataSet[]
}

type I_DataSet = {
    label: any,
    value: any
}

export default function ActionAddEdit(props: I_ActionAddEdit){
    const { open, mutate, oldData, form, titleAction} = props;

  const [loadingFetch, setLoadingFetch] = useState(false);
  const [Form, setForm] = useState<any>({
    ...oldData
  });

  const [ openDrawer, setOpenDrawer ] = useState(false)

  useEffect(() => {
    if (open){
        setOpenDrawer(true)
    }
  },[props])

  const HandleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Submit = async (e: any) => {
    e.preventDefault();

    setLoadingFetch(true);

    // if (type === "edit") {
    //   await N_PUTMahasiswa(form, oldData._id)
    //     .then((res) => {
    //       console.log(res.data);
    //       mutate();
    //       setAlert({ open: true, msg: res.data.msg, status: "success" });
    //       onClose();
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //       setAlert({
    //         open: true,
    //         msg: err.response.data.msg,
    //         status: "failed",
    //       });
    //     });
    // } else {
    //   await N_POSTMahasiswa(form)
    //     .then((res) => {
    //       mutate();
    //       setAlert({ open: true, msg: res.data.msg, status: "success" });
    //       onClose();
    //     })
    //     .catch((err) => {
    //       setAlert({
    //         open: true,
    //         msg: err.response.data.msg,
    //         status: "failed",
    //       });
    //     });
    // }

    setLoadingFetch(false);
  };

//   const Form = [
//     {
//       name: "nama",
//       label: "Name",
//       value: "",
//       icon: <AccountCircle />,
//       type: "text",
//     },
//     {
//       name: "jurusan",
//       label: "Jurusan",
//       icon: <SiGooglescholar size="100%" className="w-5 h-5" />,
//       type: "select",
//       dataSet: [
//         { label: "Teknik Informatika", value: "teknik informatika" },
//         { label: "Sistem Informasi", value: "sistem informasi" },
//       ],
//     },
//     {
//       name: "kelas",
//       label: "Kelas",
//       icon: <SiGoogleclassroom size="100%" className="w-5 h-5" />,
//       type: "select",
//       dataSet: [
//         { label: "Karyawan Sabtu", value: "karyawan sabtu" },
//         { label: "Reguler Malam", value: "reguler malam" },
//         { label: "Reguler Pagi", value: "reguler pagi" },
//         { label: "Shift", value: "shift" },
//       ],
//     },
//     {
//       name: "notelp",
//       label: "No. Telp",
//       icon: (
//         <span className="flex items-center">
//           <BsFillTelephonePlusFill size="100%" className="w-5 h-5" />
//           +62
//         </span>
//       ),
//       type: "number",
//     },
//     {
//       name: "alamat",
//       label: "Address",
//       icon: <FcAddressBook size="100%" className="w-5 h-5" />,
//       type: "text",
//     },
//     {
//       name: "semester",
//       label: "Semester",
//       icon: <MdGrade size="100%" className="w-5 h-5" />,
//       type: "number",
//     },
//   ];

  return (

    <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className="w-96 p-5 h-full">
        <h3 className="font-semibold text-lg">
            {titleAction}
        </h3>
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
                    type={item.type}
                    fullWidth
                    value={Form?.[item.name]}
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
            <Button variant="contained" color="error" onClick={() => setOpenDrawer(false)}>
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
  );
}
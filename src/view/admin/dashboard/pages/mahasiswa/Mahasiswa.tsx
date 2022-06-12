import React from 'react';

// router
import { Link } from 'react-router-dom';

// css
import s from './../../../../../asset/css/admin/dashboard/pages/mahasiswa/mahasiswa.module.css';


// material ui
import { Modal, Backdrop, Fade } from '@mui/material';

import { connect } from 'react-redux';
import { post } from 'src/lib/axios';
import { changeName } from 'src/lib/changeFormName';

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
import { N_GetListMahasiswa } from 'src/network/admin/mahasiswa';
import moment from 'moment';
import { TIMESTAMP_FORMAT_SHOW } from 'src/utils/constans/TimestampFormat';
  
  const Mahasiswa = () => {
	const [params, setParams] = useState({
	  page: 1,
	  limit: 10,
	  nama: "",
	  nim: "",
	  jurusan: '',
	  kelas: '',
	  semester: ''
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
  
	const { data: listMahasiswa, error, mutate } = useSWR([params], N_GetListMahasiswa);
	console.log(listMahasiswa)
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

	const tableHeaders = ['Name', 'Nim', 'Jurusan', 'Kelas', 'No.telp', 'Address', 'Semester', 'Tahun Ajaran', 'Register At', 'Last Updated', 'Action']
	
  
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
			onClick={() => setForm({ ...form, type: "add", open: true })}
		  >
			Add Mahasiswa
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
					  <TableCell>{moment(item.createdAt).format(TIMESTAMP_FORMAT_SHOW)}</TableCell>
					  <TableCell>{moment(item.updatedAt).format(TIMESTAMP_FORMAT_SHOW)}</TableCell>
					  <TableCell>
						<ModeEditIcon
						  className="cursor-pointer"
						  sx={{ width: 40, height: 40 }}
						  color="info"
						  onClick={() => HandleEdit(item)}
						/>
						<DeleteIcon
						  className="cursor-pointer"
						  sx={{ width: 40, height: 40 }}
						  color="error"
						  onClick={() => HandleDelete(item)}
						/>
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
  
// class Mahasiswa extends React.Component<any, any>{

// 	constructor(props: any){
// 		super(props);
// 		this.state = {
// 			isLoading: true,
// 			allMhs: [],
// 			filter:'',
// 			modal: {
// 				isLoading: false,
// 				open: false,
// 				nama_mhs: null,
// 				id_mhs: null,
// 			},
// 			pagination: {
// 				skipPage: 1	,
// 				maxPage: 0,
// 				posPage: 1,
// 			}
// 		}
// 	}

// 	deleteMhs = async () => {

// 		this.setState({modal: { ...this.state.modal, isLoading: true }});
// 		var posts = await post(`${process.env.REACT_APP_ENP_BE}api/mahasiswa/deleteMhs`, {id: this.state.modal.id_mhs});
// 		this.setState({modal: {...this.state.modal, open:false, isLoading: false}});
// 		this.updateMhs(false);
// 	}

// 	componentDidMount(){
// 		this.updateMhs(0);
// 		this.props.changeNav(this.props.location.pathname);
// 	}

// 	changePagination = async (val: any) => {
// 		switch (val) {
// 			case '+' : {
// 				this.state.pagination.posPage + 2 > this.state.pagination.maxPage ? console.log('page unknow') : this.updateMhs(this.state.pagination.posPage + 1 ) ;
// 				break;
// 			} case '-' : {
// 				this.state.pagination.posPage < 1 ? console.log('page unknow') : this.updateMhs( this.state.pagination.posPage - 1 );
// 				break;
// 			}
// 		}

// 		if (val < 100) {
// 			this.updateMhs( val );
// 		}

// 	}

// 	filterMhs = async (val: any) => {
		
// 		var allMhs = await post(`${process.env.REACT_APP_ENP_BE}api/mahasiswa/filterMhs`, {mhs: this.state.filter});
// 		this.setState({allMhs: allMhs.data.filter});
// 	}

// 	async updateMhs(skipPage: any){
// 		var allMhs = await post(`${process.env.REACT_APP_ENP_BE}api/mahasiswa`, {skip: skipPage});
		
// 		this.setState({allMhs: allMhs.data.Mhs, isLoading:false, pagination: {...this.state.pagination, maxPage: allMhs.data.max, skipPage: allMhs.data.skip, posPage:allMhs.data.page}});
// 	}

// 	render(){
// 		return(
// 			<div className={this.state.isLoading ? s.hidden : s.body}>

// 				{/* modal */}

// 				<Modal
// 			        aria-labelledby="transition-modal-title"
// 			        aria-describedby="transition-modal-description"
// 			        className={s.container_modal}
// 			        open={this.state.modal.open}
// 			        onClose={() => this.setState({modal: {...this.state.modal, open:false}})}
// 			        closeAfterTransition
// 			        BackdropComponent={Backdrop}
// 			        BackdropProps={{
// 			          timeout: 500,
// 			        }}
// 			      >
// 			        <Fade in={this.state.modal.open}>
// 			          <div className={s.modal}>
// 			            <p>Are you sure you delete {this.state.modal.nama_mhs} ? </p>
// 			            <button className={s.btn_dltModal} onClick={this.deleteMhs}>{this.state.modal.isLoading ? (
// 			            	<img src='/image/icons/loading.svg' className={s.loadingIcons} />
// 			            	) : (<span>Delete</span>) }</button>
// 			            <button className={s.btn_cnclModal} onClick={() => this.setState({modal: { ...this.state.modal, open:false }})}>Cancel</button>
// 			          </div>
// 			        </Fade>
// 			      </Modal>

// 				{/* end  */}

// 				<h1 className={`${s.title} font-bold`}>Mahasiswa</h1>

// 				<div className={s.menuHeader}>
// 					<Link to='/dashboard/mahasiswa/add'>
// 						<button className={s.button}>Tambah Mhs</button>
// 					</Link>
// 					<div className={s.filter_cont}>
// 						<input type='text' placeholder='nim/nama/etc' onChange={(e) => this.setState({filter:e.target.value})} />
// 						<button className={s.button_filter} onClick={this.filterMhs}>filter</button>
// 					</div>
// 				</div>



// 				<table>
// 					<thead>
// 						<tr>
// 							<th>No</th>
// 							<th>Nim</th>
// 							<th>Nama</th>
// 							<th>Jurusan</th>
// 							<th>Semester</th>
// 							<th>Kelas</th>
// 							<th>Alamat</th>
// 							<th>No telp</th>
// 							<th>Aksi</th>
// 						</tr>
// 					</thead>

// 					<tbody>
// 						{this.state.allMhs.map((val: any, index: any) => (
// 							<tr>
// 								<td className={s.no}>{this.state.pagination.skipPage + 1 + index}</td>
// 								<td className={s.nim}>{val.nim}</td>
// 								<td className={s.nama}>{changeName(val.nama)}</td>
// 								<td className={s.jurusan}>{changeName(val.jurusan)}</td>
// 								<td className={s.semester}>{val.semester}</td>
// 								<td className={s.kelas}>{changeName(val.kelas)}</td>
// 								<td className={s.alamat}>{val.alamat}</td>
// 								<td className={s.notelp}>0{val.notelp}</td>
// 								<td className={s.container_button}>
// 									<Link className={s.link} to={{pathname:'/dashboard/mahasiswa/update?id=' + val._id}}>
// 										<button className={s.updateButton}>
// 											<img src='/image/icons/update.svg' className={s.iconsButton} title='update' alt='update' />
// 										</button>
// 									</Link>
// 									<Link to='#' className={s.link} onClick={() => this.setState({modal: { open:true, nama_mhs:val.nama , id_mhs:val._id }})}>
// 										<button className={s.deleteButton}>
// 											<img src='/image/icons/delete.svg' className={s.iconsButton} title='delete' alt='delete' />
// 										</button>
// 									</Link>
// 								</td>
// 							</tr>
// 							))}
// 					</tbody>
// 				</table>

// 				<div className={s.container_pagination}>
// 					<p>pages {Math.round(this.state.pagination.skipPage / 8 + 1)} from {this.state.pagination.maxPage} </p>
// 					<div className={s.container_arrow}>
// 						<img src='/image/icons/previous-button.svg' className={s.arrowPagin} onClick={() => this.changePagination('-')} />

// 						{/* pagination */}
// 						{(() => {
// 					        const pagination = [];
// 					        for (let i = 1; i <= this.state.pagination.maxPage; i++) {

// 					          if (i <= 0 ) {
// 					           continue
// 					       	 }

// 					       	 if (this.state.pagination.maxPage > 3){
// 					          	if (i >= this.state.pagination.skipPage + 3  ) { continue }
// 					          }

// 					          pagination.push(<p className={i === this.state.pagination.posPage + 1 ? s.paginationPost : '' } onClick={() => this.changePagination(i-1)}>{i}</p>);
// 					        }

// 					        if ( this.state.pagination.maxPage > 3 ) {
// 						        pagination.push(<p>...</p>);
// 						        pagination.push(<p>{this.state.pagination.maxPage}</p>);
// 					        }

// 					        return pagination;
// 					      })()}


// 						<img src='/image/icons/next-button.svg' className={s.arrowPagin} onClick={() => this.changePagination('+')} />
// 					</div>
// 				</div>

// 			</div>
// 			)
// 	}
// }

const mapDispathToProps = (dispatch: any) => {
	return {
		changeNav : (nav: any) => dispatch({type:'change_navDashboard', nav:nav}),
	}
}

export default connect(null,mapDispathToProps)(Mahasiswa);
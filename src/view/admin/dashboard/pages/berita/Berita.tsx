import React from "react";

import styles from "./../../../../../asset/css/admin/dashboard/pages/berita.module.css";

import Axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";

import { Card, Modal, Backdrop, Fade, Button, Divider, Tab } from '@mui/material';

// Cookie
import Cookies from "universal-cookie";

// lib


import { connect } from 'react-redux';
import { post } from "src/lib/axios";
import moment from "moment";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { toast } from "react-toastify";

var cookie = new Cookies();

class Master extends React.Component<any, any> {
	constructor(props:any) {
		super(props);
		this.state = {
			activeTab: '1',
			loading: {
				deleteArticle: false
			},
			form: {
				judul: null,
				file: null,
				textIsi: null,
			},
			modal: {
				open:false,
				id: null,
				title: null,
				image: null,
				content: null,
			},
			navCreate: true,
			liveImage: null,
			listNews: [],
			isLoading:false,
		};
	}

	_onChangeFile = (e: any) => {
		const file = e.target.files[0];
		this.setState({ form: { ...this.state.form , file: file } });

		const path = URL.createObjectURL(file);
		this.setState({ liveImage: path });
	};

	_btnSave = async () => {

		this.setState({isLoading:true})// loading true
		
		const formData = new FormData();
		formData.append("file", this.state.form.file);

		await post(`${process.env.REACT_APP_ENP_BE}api/broadcast/addImage`, formData)
			.then(async (res) => {
				if (res.data.status === true) {
					await post(`${process.env.REACT_APP_ENP_BE}api/broadcast/addNews`, {
						judul: this.state.form.judul,
						MediaId: res?.data?.MediaId,
						isiText: this.state.form.textIsi,
						imgUrl: res.data.path,
						token: cookie.get('auth-token'),
					}).then(res => {
						toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
						this._generatedList();
					}).catch(err => alert(err));
				}
			})


		this.setState({isLoading:false});
	};

	_generatedList = async () => {
		await Axios.get(
			`${process.env.REACT_APP_ENP_BE}api/broadcast/allData`
		)
			.then((res) => {
				this.setState({ listNews: res.data.data.reverse() })
			})
			.catch((err) => console.log(err));
	};

	deleteNews = async () => {
		this.setState({ ...this.state, loading: { ...this.state.loading, deleteArticle: true } });
		let resPost = await post(`${process.env.REACT_APP_ENP_BE}api/broadcast/delete`, { id: this.state.modal.id, MediaId: this.state.modal.MediaId, token: cookie.get('auth-token') })
		if (resPost.data.result === 'success'){
			this._generatedList();
			this.setState({ ...this.state, modal: { ...this.state.modal, open: false }, loading: { ...this.state.loading, deleteArticle: false } })
			toast.success(resPost.data.message, { position: toast.POSITION.TOP_RIGHT })
		}
	}

	componentDidMount() {
		this._generatedList();
		this.props.changeNav(this.props.location.pathname);
	}

	render() {
		const { activeTab } = this.state
		return (
			<div className={`${styles.body} bg-white p-5`}>
				<TabContext value={activeTab}>
					<TabList onChange={(e,value) => this.setState({ ...this.state, activeTab: value })} aria-label="lab API tabs example" className='border-b'>
						<Tab label="List Articles" value="1" />
						<Tab label="Write News" value="2" />
					</TabList>
					<TabPanel value="2">
						{/* create */}
							<div
								className={styles.cont_create_active}
							>
								<div className={styles.left_windowCreate}>
									<div className={styles.inputJudul}>
										<p>Judul</p>
										<textarea
											className='border'
											onChange={(e) =>
												this.setState({
													form: {
														...this.state.form,
														judul: e.target.value,
													},
												})
											}
										/>
									</div>
									<div className={styles.inputImage}>
										<p>Gambar</p>
										<input type="file" onChange={this._onChangeFile} />
									</div>
									{this.state.liveImage ? (
										<div className={styles.liveImage}>
											<p>Preview</p>
											<img
												alt=""
												src={this.state.liveImage}
												style={{ width: "90%" }}
											/>
										</div>
									) : null}
								</div>
								<div className={styles.right_windowCreate}>
									<div className={styles.inputText}>
										<p>Content </p>
										<textarea
											className='border'
											onChange={(e) =>
												this.setState({
													form: {
														...this.state.form,
														textIsi: e.target.value,
													},
												})
											}
										/>
									</div>
									<button
										className={styles.btn_save}
										onClick={this._btnSave}
									>
										Save {this.state.isLoading ? <CircularProgress style={{ marginLeft: 10 }} size={15} color="inherit" disableShrink /> : null } 
									</button>
								</div>
							</div>
							{/* end create */}
					</TabPanel>
					<TabPanel value="1">
						{/* list */}
						<div
							className={styles.cont_create_active}
						>

							<Modal
								open={this.state.modal.open}
								onClose={() => this.setState({modal: { ...this.state.modal, open:false }})}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<div className='w-10/12 lg:w-1/2 mx-auto bg-white p-5 my-5 overflow-y-auto max-h-screen rounded'>
									<p className='text-2xl text-center font-bold'>{this.state.modal.title}</p>
									<img src={`${this.state.modal.image}`} className='w-11/12 mx-auto my-5' />
									<p className="text-xs mb-1 text-gray-500 mt-12">{moment(this.state.modal.time_post).format('llll')}</p>
									<p className='mb-10 mt-2'>{this.state.modal.content}</p>

									<div className='flex justify-end mt-20 mb-10'>
										<div>
											<LoadingButton loading={this.state.loading.deleteArticle} variant="contained" color="error" onClick={this.deleteNews}>Delete</LoadingButton>
										</div>
										<div className='ml-2'>
											<Button variant="contained" color="primary" onClick={
												() => this.setState({modal: { ...this.state.modal, open:false }})
												}>Close</Button>
										</div>
									</div>

								</div>
							</Modal>
							<div className='mt-5 masonry-3-col tablet:masonry-3-col laptop:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit bg-gray-100 p-2 shadow border'>
								{this.state.listNews.map((val: any, index: any) => (
									<Card className='m-2 p-5 cursor-pointer hover:shadow-xl ' onClick={
										() => this.setState({modal: {id:val._id, title: val.title, image: val.imageUrl, content: val.content, MediaId: val.MediaId, time_post: val.time_post, open: true }})
										}>
										<h2 className='overflow-hidden text-sm lg:text-lg font-bold text-center'>{val.title}</h2>
										<img src={`${val.imageUrl}`} className='mx-auto my-5' />
										<p className="text-xs mb-1 text-gray-500 mt-12">{moment(val.time_post).format('llll')}</p>
										<p className='text-sm'>{val.content}</p>
									</Card>
								))}
							</div>
						</div>
						{/* end list */}
					</TabPanel>
				</TabContext>

				

				
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		changeNav: (nav: any) => dispatch({type:'change_navDashboard', nav: nav}),
	}
}

export default connect(null, mapDispatchToProps)(Master);

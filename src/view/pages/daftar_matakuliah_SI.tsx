import React, { Fragment } from "react";

// material-ui
import {
	Paper,
	Breadcrumbs,
	Typography,
	Container,
	Grid,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";


// module react-anchor
import ScrollableAnchor from "react-scrollable-anchor";

// mycss
import s from "./../../asset/css/daftar_matakuliah_SI.module.css";

// react-router-dom link
import { Link } from "react-router-dom";

// my footer
import Footer from "../../component/footer/Footer";

// data mata kuliah TI
import Data from "../../component/data/data_daftar_matkul_SI.js";
import Navbar from "src/component/navbar/navbar";
import FastMenu from "src/component/molecules/user/fastMenu";

class daftar_matakuliah_SI extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			isOpen: [],
		};
	}

	componentDidMount() {
		document.title = "kalender akademik";

		console.log(Data);
	}

	render() {
		return (
			<Fragment>
				<Navbar />
				<ScrollableAnchor id="main">
					<div></div>
				</ScrollableAnchor>
				<div className='container mx-auto my-10'>
					<Grid container spacing={5}>
						<Grid item sm={8}>
							<Paper
								className={'p-10'}
								variant="outlined"
								square
							>
								<Breadcrumbs
									aria-label="breadcrumb"
									className={s.breadcrumb}
								>
									<Link
										color="inherit"
										to="/#main"
										className={s.link}
									>
										Home
									</Link>
									<Typography color="textPrimary">
										Daftar matakuliah SI
									</Typography>
								</Breadcrumbs>
								<div className={s.paperContent}>
									<h2 className={s.contentheader}>
										Daftar matakuliah SI
									</h2>
									<div className={s.contentmain}>
										<Container>
											<TableContainer
												component={Paper}
												className={s.table_container}
											>
												{/*menggunakan class disetiab cell digunakan karena tidak work jika menggunakan class di parent*/}
												<Table aria-label="simple table">
													<TableHead>
														<TableRow>
															<TableCell
																className={
																	s.table_font
																}
															>
																No
															</TableCell>
															<TableCell
																align="center"
																className={
																	s.table_font
																}
															>
																Nama Dosen
																Pengajar
															</TableCell>
															<TableCell
																align="center"
																className={
																	s.table_font
																}
															>
																Kode Matakuliah
															</TableCell>
															<TableCell
																align="center"
																className={
																	s.table_font
																}
															>
																Nama Matakuliah
															</TableCell>
															<TableCell
																align="center"
																className={
																	s.table_font
																}
															>
																Jumlah Kelas
															</TableCell>
															<TableCell
																align="center"
																className={
																	s.table_font
																}
															>
																Jumlah Pertemuan
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{Data.map(
															(
																daftar_matakuliah,
																i
															) => (
																<TableRow
																	key={i}
																>
																	<TableCell
																		className={
																			s.table_font
																		}
																	>
																		{
																			daftar_matakuliah.no
																		}
																	</TableCell>
																	<TableCell
																		className={
																			s.table_font
																		}
																	>
																		{
																			daftar_matakuliah.nama
																		}
																	</TableCell>
																	{/* looping kode matakuliah dari data */}
																	<TableCell
																		align="left"
																		className={
																			s.table_font
																		}
																	>
																		{daftar_matakuliah.data.map(
																			(
																				data,
																				i
																			) => (
																				<TableRow
																					key={
																						i
																					}
																				>
																					<TableCell
																						align="left"
																						className={
																							`${s.table_font} whitespace-nowrap`
																						}
																					>
																						{
																							data.kode_matakuliah
																						}
																					</TableCell>
																				</TableRow>
																			)
																		)}
																	</TableCell>
																	{/* looping kode nama matakuliah dari data */}
																	<TableCell
																		align="left"
																		className={
																			s.table_font
																		}
																	>
																		{daftar_matakuliah.data.map(
																			(
																				data,
																				i
																			) => (
																				<TableRow
																					key={
																						i
																					}
																				>
																					<TableCell
																						align="left"
																						className={
																							s.table_font
																						}
																					>
																						{
																							data.nama_matakuliah
																						}
																					</TableCell>
																				</TableRow>
																			)
																		)}
																	</TableCell>
																	{/* looping jumlah kelas dari data */}
																	<TableCell
																		align="left"
																		className={
																			s.table_font
																		}
																	>
																		{daftar_matakuliah.data.map(
																			(
																				data,
																				i
																			) => (
																				<TableRow
																					key={
																						i
																					}
																				>
																					<TableCell
																						align="left"
																						className={
																							s.table_font
																						}
																					>
																						{
																							data.jumlah_kelas
																						}
																					</TableCell>
																				</TableRow>
																			)
																		)}
																	</TableCell>
																	{/* looping kode nama matakuliah dari data */}
																	<TableCell
																		align="left"
																		className={
																			s.table_font
																		}
																	>
																		{daftar_matakuliah.data.map(
																			(
																				data,
																				i
																			) => (
																				<TableRow
																					key={
																						i
																					}
																				>
																					<TableCell
																						align="left"
																						className={
																							s.table_font
																						}
																					>
																						{
																							data.pertemuan
																						}
																					</TableCell>
																				</TableRow>
																			)
																		)}
																	</TableCell>
																</TableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</Container>
									</div>
								</div>
							</Paper>
						</Grid>
						<Grid item sm={3}>
							<FastMenu />
						</Grid>
					</Grid>
				</div>
				<Footer />
			</Fragment>
		);
	}
}

export default daftar_matakuliah_SI;

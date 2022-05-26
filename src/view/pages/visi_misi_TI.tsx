import React, { Fragment } from "react";

// material-ui
import {
	Paper,
	Breadcrumbs,
	Typography,
	Container,
	Grid,
} from "@mui/material";

// module react-anchor
import ScrollableAnchor from "react-scrollable-anchor";

// mycss
import s from "./../../asset/css/visi_misi_TI.module.css";

// react-router-dom link
import { Link } from "react-router-dom";

// my footer
import Footer from "../../component/footer/Footer";
import Navbar from "src/component/navbar/navbar";
import FastMenu from "src/component/molecules/user/fastMenu";

class visi_misi_TI extends React.Component<any, any>{
	constructor(props: any) {
		super(props);
		this.state = {
			isOpen: [],
		};
	}

	componentDidMount() {
		document.title = "visi misi TI";
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
								className={s.paperMain}
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
										Visi dan Misi TI
									</Typography>
								</Breadcrumbs>
								<div className={s.paperContent}>
									<h2 className={s.contentheader}>
										Visi Misi TI
									</h2>
									<div className={s.contentmain}>
										<h3>visi</h3>
										<Container>
											<p className={s.visi}>
												Menjadi Program Studi Teknik
												Informatika unggulan dalam
												bidang Rekayasa Perangkat Lunak,
												Sistim Jaringan dan Sistim
												Cerdas pada tahun 2025.
											</p>
										</Container>
									</div>
									<div className={s.contentmain}>
										<h3>misi</h3>
										<Container>
											<ul className={s.listTujuan}>
												<li className={s.li_tujuan}>
													Menyelenggarakan pendidikan
													berkualitas dalam rangka
													menghasilkan lulusan Teknik
													Informatika yang
													berkualifikasi akademik
													unggul sesuai dengan tiga
													bidang peminatan, yaitu (a)
													Multimedia, (b) computer
													network and information
													system, (c) robotics and
													aritificial Intelligent yang
													mempunyai keahlian dan siap
													bersaing dalam pasar
													profesional, dan/atau siap
													menciptakan peluang kerja
													baru.
												</li>
												<li className={s.li_tujuan}>
													Melaksanakan penelitian yang
													berorientasi pada
													pengembangan keilmuan Teknik
													Informatika.
												</li>
												<li className={s.li_tujuan}>
													Menggunakan dan
													mengembangkan ilmu dan
													teknologi inovatif yang
													dapat memberi sumbangan pada
													kualitas kehidupan
													masyarakat yang lebih baik
													denga nmenjunjung tinggi
													etika dan moral.
												</li>
												<li className={s.li_tujuan}>
													Melaksanakan pengabdian
													masyarakat bidang
													informatika untuk
													pemberdayaan masyarakat.
												</li>
												<li className={s.li_tujuan}>
													Membina link and match
													antara perguruan tinggi
													dengan dunia industri.
												</li>
												<li className={s.li_tujuan}>
													Meningkatkan kuantitas
													maupun kualitas sarana
													pembelajaran dan
													laboratorium serta fasilitas
													ekstrakurikuler.
												</li>
											</ul>
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

export default visi_misi_TI;

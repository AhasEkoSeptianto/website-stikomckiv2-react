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
import s from "./../../asset/css/visi_misi_SI.module.css";


// react-router-dom link
import { Link } from "react-router-dom";

// my footer
import Footer from "../../component/footer/Footer";
import Navbar from "src/component/navbar/navbar";
import FastMenu from "src/component/molecules/user/fastMenu";

class visi_misi_SI extends React.Component<any, any>{
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
										Visi dan Misi SI
									</Typography>
								</Breadcrumbs>
								<div className={s.paperContent}>
									<h2 className={s.contentheader}>
										Visi Misi SI
									</h2>
									<div className={s.contentmain}>
										<h3>visi</h3>
										<Container>
											<p className={s.visi}>
												Menjadi program studi sistem
												informasi unggul yang adaptif,
												kreatif dan inovatif dalam
												bidang smart information systems
												untuk menghasilkan lulusan yang
												professional, bertaqwa dan
												beretika pada tahun 2025.
											</p>
										</Container>
									</div>
									<div className={s.contentmain}>
										<h3>misi</h3>
										<Container>
											<ul className={s.listTujuan}>
												<li className={s.li_tujuan}>
													Menyelenggarakan sistem
													pendidikan tinggi yang
													berlandaskan pada
													prefesionalisme, ketaqwaan
													dan norma-norma etika yang
													berlaku.
												</li>
												<li className={s.li_tujuan}>
													Menyelenggarakan pendidikan
													tinggi berkualitas untuk
													menghasilkan lulusan yang
													berkualifikasi unggul dalam
													bidang smart information
													systems yang mampu bersaing
													pada pasar profesional.
												</li>
												<li className={s.li_tujuan}>
													Mengembangkan penelitian
													dalam bidang smart
													information systems yang
													adaptif, kreatif dan
													inovatif
												</li>
												<li className={s.li_tujuan}>
													Melaksanakan pengabdian
													kepada masyarakat dalam
													mengimplementasikan bidang
													ilmu sistem informasi.
												</li>
												<li className={s.li_tujuan}>
													Menjalin kerjasama dengan
													instansi pemerintah dan
													swasta pada tingkat nasional
													dan internasional dalam
													rangka adopsi perkembangan
													ilmu dan teknologi serta
													penerapannya.
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

export default visi_misi_SI;

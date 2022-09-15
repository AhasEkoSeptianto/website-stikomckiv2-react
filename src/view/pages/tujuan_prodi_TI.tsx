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
import s from "./../../asset/css/tujuan_prodi_TI.module.css";


// react-router-dom link
import { Link } from "react-router-dom";

// my footer
import Footer from "../../component/footer/Footer";
import Navbar from "src/component/navbar/navbar";
import FastMenu from "src/component/molecules/user/fastMenu";

class tujuan_prodi_TI extends React.Component<any, any>{
	constructor(props: any) {
		super(props);
		this.state = {
			isOpen: [],
		};
	}

	componentDidMount() {
		document.title = "tujuan prodi TI";
	}

	render() {
		return (
			<Fragment>
				<Navbar />
				<ScrollableAnchor id="main">
					<div></div>
				</ScrollableAnchor>
				<div className='container mx-auto my-10' style={{ minHeight: 600 }}>
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
										Tujuan prodi TI
									</Typography>
								</Breadcrumbs>
								<div className={s.paperContent}>
									<h2 className={s.contentheader}>
										Tujuan prodi TI
									</h2>
									<div className={s.contentmain}>
										<h3>tujuan prodi TI adalah</h3>
										<Container>
											<ul className={s.listTujuan}>
												<li className={s.li_tujuan}>
													Menghasilkan lulusan
													berstandar nasional dan
													berwawasan global dalam
													bidang Teknik Informatika
													yang beriman, berilmu dan
													berakhlak mulia.
												</li>
												<li className={s.li_tujuan}>
													Menghasilkan penelitian yang
													berorientasi pada
													pengembangan keilmuan Teknik
													Informatika.
												</li>
												<li className={s.li_tujuan}>
													Mengembangkan ilmu dan
													teknologi inovatif yang
													dapat memberi sumbangan pada
													kualitas kehidupan
													masyarakat yang lebih baik
													dengan menjunjung tinggi
													etika dan moral.
												</li>
												<li className={s.li_tujuan}>
													Menghasilkan karya inovatif
													yang dapat dimanfaatkan oleh
													masyarakat.
												</li>
												<li className={s.li_tujuan}>
													Terjalinnya link and match
													program studi dengan dunia
													industri.
												</li>
												<li className={s.li_tujuan}>
													Terjadinya peningkatan
													kuantitas maupun kualitas
													sarana pembelajaran dan
													laboratorium serta fasilitas
													ekstrakurikuler
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

export default tujuan_prodi_TI;

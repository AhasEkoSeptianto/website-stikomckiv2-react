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
import s from "./../../asset/css/tujuan_prodi_SI.module.css";


// react-router-dom link
import { Link } from "react-router-dom";

// my footer
import Footer from "../../component/footer/Footer";
import Navbar from "../../component/navbar/navbar";
import FastMenu from "src/component/molecules/user/fastMenu";

class tujuan_prodi_SI extends React.Component<any, any>{
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
										Tujuan prodi SI
									</Typography>
								</Breadcrumbs>
								<div className={s.paperContent}>
									<h2 className={s.contentheader}>
										Tujuan prodi SI
									</h2>
									<div className={s.contentmain}>
										<h3>tujuan prodi SI adalah</h3>
										<Container>
											<ul className={s.listTujuan}>
												<li className={s.li_tujuan}>
													Menghasilkan lulusan yang
													professional, bertaqwa dan
													beretika.
												</li>
												<li className={s.li_tujuan}>
													Menghasilkan lulusan yang
													kompeten dalam bidang smart
													information systems dan
													mampu menciptakan peluang
													kerja.
												</li>
												<li className={s.li_tujuan}>
													Menghasilkan teknologi
													inovatif dan kreatif
													berbasis penelitian dalam
													bidang smart information
													systems.
												</li>
												<li className={s.li_tujuan}>
													Meningkatkan kualitas hidup
													masyarakat melalui
													pemanfaatan teknologi
													informasi yang inovatif dan
													kreatif yang berlandaskan
													etika dan moral.{" "}
												</li>
												<li className={s.li_tujuan}>
													Terjalinnya link and match
													antara program studi sistem
													informasi dengan instansi
													pemerintah dan swasta pada
													tingkat nasional dan
													internasional dalam rangka
													adopsi perkembangan ilmu dan
													teknologi serta
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

export default tujuan_prodi_SI;

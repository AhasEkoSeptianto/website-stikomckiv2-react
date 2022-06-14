import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const MenuSideBarAdmin = [
	{
	  label: "Dashboard",
	  icon: <DashboardIcon sx={{ width: 25, height: 25 }} />,
	  link: "/dashboard",
	},
	{
	  label: 'Admin',
	  icon: <SupervisorAccountIcon sx={{ width: 25, height: 25 }} />,
	  link: '/dashboard/admin'
	},
	{
		label: "Mahasiswa",
	  icon: <SchoolIcon sx={{ width: 25, height: 25 }} />,
	  link: "/dashboard/mahasiswa",
	},
	{
		label: "Dosen",
		icon: <CastForEducationIcon sx={{ width: 25, height: 25 }} />,
		link: "/dashboard/dosen",
	},
	{
	  label: "Berita",
	  icon: <NewspaperIcon sx={{ width: 25, height: 25 }} />,
	  link: "/dashboard/berita",
	},
	{
	  label: "Setting",
	  icon: <SettingsIcon sx={{ width: 25, height: 25 }} />,
	  link: "/dashboard/settings",
	},
  ];

  export default MenuSideBarAdmin
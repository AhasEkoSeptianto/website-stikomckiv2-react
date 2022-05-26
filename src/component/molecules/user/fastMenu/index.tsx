import { Divider, Paper, Stack } from "@mui/material";

export default function FastMenu() {
  const CONT_FASTMENU = [
    {
      menu: "Kategory",
      dropdown: [
        { subMenu: "Berita", link: "#" },
        { subMenu: "Pengumuman", link: "#" },
      ],
    },
    {
      menu: "Berita Terbaru",
      dropdown: [
        { subMenu: "Berita", link: "#" },
        { subMenu: "Pengumuman", link: "#" },
      ],
    },
  ];

  return (
    <Paper className="p-2" variant='outlined'>
      {CONT_FASTMENU.map((item, idx) => (
        <div>
          <h1 className='p-2 font-semibold'>{item.menu}</h1>
          <Divider />
          <Stack
            direction='column'
            spacing={1}
            className='p-3'
          >
            {item.dropdown.map((item, idx) => (
              <p key={idx}>{item.subMenu}</p>
            ))}
          </Stack>
        </div>
      ))}
    </Paper>
  );
}

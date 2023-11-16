import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, ListItemAvatar } from "@mui/material";
import Logo from "../../assets/imgs/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/intex";
import { useTema } from "../../common/context/Tema";
import toast from "react-hot-toast";
type Anchor = "top" | "left" | "bottom" | "right";

interface propsDrawer {
  coteudo: React.ReactNode;
  inten1?: React.ReactNode;
  textoI1?: string;
  inten2?: React.ReactNode;
  textoI2?: string;
  inten3?: React.ReactNode;
  textoI3?: string;
  inten4?: React.ReactNode;
  textoI4?: string;
  inten5?: React.ReactNode;
  inten6?: React.ReactNode;
  textoI6?: string;
}

export default function DrawerOng({
  coteudo,
  inten1,
  textoI1,
  inten2,
  textoI2,
  inten3,
  textoI3,
  inten4,
  textoI4,
  inten6,
  textoI6,
}: propsDrawer) {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigator = useNavigate();



  const { pegarTema } = useTema() as {
    pegarTema: string;
  };


  const notify = (message: string): void => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };



  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                onClick={() => navigator("/")}
                alt="Travis Howard"
                src={Logo}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
            <ListItemText primary={"Be Human"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten1}</ListItemIcon>
            <ListItemText primary={textoI1} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten2}</ListItemIcon>
            <ListItemText primary={textoI2} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten3}</ListItemIcon>
            <ListItemText primary={textoI3} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{inten4}</ListItemIcon>
            <ListItemText primary={textoI4} />
          </ListItemButton>
        </ListItem>

          <Link to={"/Dashboard"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{inten6}</ListItemIcon>
                <ListItemText primary={textoI6} />
              </ListItemButton>
            </ListItem>
          </Link>
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{coteudo}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

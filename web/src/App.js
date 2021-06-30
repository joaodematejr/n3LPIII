import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export default function FullWidthGrid() {
  const [list, setList] = useState([]);
  const [tmpList, setTmpList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function getMotorcycle() {
    await axios
      .get("http://localhost:3000/motorcycle/", {})
      .then(function (response) {
        if (response.status === 200) {
          setLoading(false);
          setList(response.data);
        }
      })
      .catch(function (error) {
        if (error) {
          alert(
            "Ocorreu um erro por favor entre em contato com desenvolvedor."
          );
        }
      });
  }

  useEffect(() => {
    getMotorcycle();
  }, []);

  async function handleEditOrDelete(item) {}

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const columns = [
    {
      field: "condition_desc",
      headerName: "Descrição da condição",
      width: 190,
    },
    { field: "price", headerName: "Preço", width: 100 },
    { field: "location", headerName: "Localização", width: 160 },
    { field: "model_year", headerName: "Ano", width: 100 },
    { field: "exterior_color", headerName: "Cor", width: 100 },
    { field: "make", headerName: "Marca", width: 160 },
    { field: "model", headerName: "Modelo", width: 160 },
    { field: "sub_model", headerName: "Submodelo", width: 160 },
  ];

  return (
    <div className={classes.root}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Novo
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Descrição da condição"
                variant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Preço"
                variant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Localização"
                variant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Ano"
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Cor"
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Marca"
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Modelo"
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                style={{ width: "100%" }}
                id="filled-basic"
                label="Submodelo"
                variant="filled"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h2">
              Prova
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              style={{ width: "100%" }}
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Novo
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              disabled={true}
              style={{ width: "100%" }}
              variant="outlined"
              color="primary"
            >
              Editar
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              disabled={true}
              style={{ width: "100%" }}
              variant="outlined"
              color="secondary"
            >
              Deletar
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                loading={loading}
                rows={list}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowSelected={(e) => handleEditOrDelete(e.data)}
                autoHeight
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

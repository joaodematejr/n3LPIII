import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";

import axios from "axios";

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

export default function FullWidthGrid() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

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
  //

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
      <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h2">
              Prova
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                loading={loading}
                rows={list}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableMultipleSelection={true}
                onSelectionModelChange={(itm) => console.log(itm)}
                autoHeight
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

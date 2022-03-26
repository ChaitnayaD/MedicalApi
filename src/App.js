import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(async () => {
    await fetch("https://dev.dashmed.in/sample-data")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1 className="header">Medicines</h1>
        <ul>
          {items.map((item) => (
            <>
              <div key={item.medName}>
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                      <Item>
                        <Card sx={{ minWidth: 275 }}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              Medicine Name : {item.medName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              Salt Name : {item.saltName}
                            </Typography>
                            <Typography variant="body2">
                              Manufacturer : {item.manufacturer}
                            </Typography>
                            <Typography variant="body2">
                              M.R.P : {item.mrp}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Item>
                    </Grid>
                  </Grid>
                </>
              </div>
            </>
          ))}
        </ul>
      </>
    );
  }
};
export default App;

import { useState, useEffect } from "react";
import QuoteMachine from "./components/QuoteMachine";
import { random } from "lodash";
import "@fontsource/roboto";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
  },
};

function App({ classes }) {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json",
    )
      .then((data) => data.json())
      .then((quotes) => {
        setQuotes(quotes);
        setSelectedQuoteIndex(random(0, quotes.length - 1));
      });
  }, []);

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return;
    }
    return quotes[selectedQuoteIndex];
  }

  function assignNewQuoteIndex() {
    setSelectedQuoteIndex(random(0, quotes.length - 1));
  }

  return (
    <Grid
      className={classes.container}
      id="quote-box"
      justifyContent="center"
      container
    >
      <Grid xs={11} lg={8} item>
        {getSelectedQuote() ? (
          <QuoteMachine
            selectedQuote={getSelectedQuote()}
            assignNewQuoteIndex={assignNewQuoteIndex}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);

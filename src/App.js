import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Typography, Button, Grid, Box } from "@mui/material";

export default function App() {
  // State to hold the dice data
  const [dice, setDice] = React.useState(allNewDice());
  // State to check if the game is won
  const [tenzies, setTenzies] = React.useState(false);
  // State to hold any message to display
  const [message, setMessage] = React.useState("");

  // useEffect to check if the game is won
  React.useEffect(() => {
    // Check if all dice are held
    const allHeld = dice.every((die) => die.isHeld);
    // Check if all dice have the same value
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld) {
      if (allSameValue) {
        // If all dice are held and have the same value, the game is won
        setTenzies(true);
        setMessage(""); // Clear any previous message
        console.log("You won!");
      } else {
        // If not all dice are the same, set an error message
        setMessage("Not all dice are the same. Try again!");
      }
    }
  }, [dice]);

  // Function to generate a new die with random value
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // Function to generate a new set of dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // Function to handle rolling of dice
  function rollDice() {
    if (tenzies || message) {
      // Restart the game if all dice are the same or if there's a message
      setDice(allNewDice());
      setTenzies(false);
      setMessage(""); // Clear message when starting a new game
    } else {
      // Roll the dice if the game is not won
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  // Function to toggle the hold state of a die
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // Map dice data to Die components
  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ bgcolor: "#0B2434" }} // Optional background color for the entire page
    >
      {tenzies && <Confetti />} {/* Show confetti animation if the game is won */}
      <Box
        p={10}
        borderRadius={2}
        bgcolor="#ffffff"
        boxShadow={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Tenzies
        </Typography>
        <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
          Win the game by ensuring all 10 dices have the same value. Click each die to lock its currrent value and click again to unlock its value.
        </Typography>
        {message && (
          <Typography variant="body1" align="center" sx={{ mb: 4, color: "red" }}>
            {message} {/* Display message if there is one */}
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="center">
          {diceElements} {/* Render the dice components */}
        </Grid>
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={rollDice} /* Button to roll dice or restart the game */
          >
            {tenzies || message ? "Restart" : "Roll"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

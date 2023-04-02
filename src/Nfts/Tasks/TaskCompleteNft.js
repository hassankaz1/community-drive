import { setTheNft } from "../../firebase";

async function completeTask(title, desc, image, difficulty, uid) {
  const form = new FormData();
  form.append("quantity", "1");
  form.append("chain", "goerli");
  form.append("imageUrl", image);
  form.append("name", title);
  form.append("description", desc);
  form.append("contractAddress", process.env.REACT_APP_VERB_CONTACT);
  form.append("data", getRarity());

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.REACT_APP_VERB_API,
    },
  };

  options.body = form;

  fetch("https://api.verbwire.com/v1/nft/mint/mintFromMetadata", options)
    .then((response) => response.json())
    .then((response) => setTheNft(response, uid))
    .catch((err) => console.error(err));

  //update the user with data relating to this nft.

  function getRarity(difficulty) {
    // Define a probability distribution based on the difficulty
    let probability;
    if (difficulty < 3) {
      probability = [0.7, 0.25, 0.05, 0.001];
    } else if (difficulty < 6) {
      probability = [0.4, 0.4, 0.15, 0.05];
    } else {
      probability = [0.15, 0.35, 0.35, 0.15];
    }

    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Assign the rarity based on the probability distribution
    if (randomNumber < probability[0]) {
      return "common";
    } else if (randomNumber < probability[0] + probability[1]) {
      return "uncommon";
    } else if (
      randomNumber <
      probability[0] + probability[1] + probability[2]
    ) {
      return "epic";
    } else {
      return "legendary";
    }
  }
}

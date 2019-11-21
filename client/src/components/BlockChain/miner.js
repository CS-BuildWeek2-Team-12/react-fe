const utf8 = require("utf8");
const axios = require("axios");
const sha256 = require("js-sha256");


const wait = cd => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cd);
    }, cd * 1000);
  });
};

const callAxios = () => {
  return axios.create({
    baseURL: "https://lambda-treasure-hunt.herokuapp.com/api/bc/",
    headers: {
      Authorization: `Token 9b0358e2d1f341ee80abf2cfe7679e785bcafd06`,
      "Content-Type": "application/json"
    }
  });
};

const sendProof = async proof => {
  try {
    console.log("complete");
    return await callAxios().post("mine/", { proof });
  } catch (err) {
    console.log(err.response);
    return { data: { cooldown: 20 } };
  }
};

const getLastProof = async () => {
  const { data: last_proof } = await callAxios().get("last_proof/");
  return last_proof;
};

const proof_of_work = (last_proof, difficulty) => {
  console.log("Searching for next proof");
  let proof = 0;

  const valid = "0".repeat(difficulty);

  while (!valid_proof(proof, valid, difficulty, last_proof)) {
    proof += 1;
    if (proof % 1000000 === 0) {
      console.log("#", proof);
    }
  }

  console.log("Proof found: ", proof);
  return proof;
};

const valid_proof = (proof, correctProof, difficulty, last_proof) => {
  let guessStr = `${last_proof}${proof}`;
  let guess = utf8.encode(guessStr);
  let guess_hash = sha256
    .create()
    .update(guess)
    .hex()
    .slice(0, difficulty);

  return guess_hash === correctProof;
};

const mineCoins = async cd => {
  console.log("Start of mineCoins");
  await wait(cd);
  const last_proof = await getLastProof();
  console.log(
    "Last proof: ",
    last_proof.proof,
    "Difficulty: ",
    last_proof.difficulty
  );

  const proof = await proof_of_work(last_proof.proof, last_proof.difficulty);
  console.log("next valid proof", proof);

  const { data } = await sendProof(proof);
  console.log(data);

  return mineCoins(data.cooldown);
};
mineCoins();
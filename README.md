# This project is about the web3 version of Calendly
Credit goes to the dev YouTuber [(Part Time Larry)](https://www.youtube.com/channel/UCY2ifv8iH1Dsgjrz-h3lWLQ) for uploading a great tutorial


## Calend3 project uses Hardhat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
### Create your hardhat.config.js file for this to work (sample below)
```shell
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: (API for connecting to test net),
      accounts: (private key for a test wallet)
    }
  }
}
```
# This project is about the web3 version of Calendly
Credit goes to the dev YouTuber [(Part Time Larry)](https://www.youtube.com/channel/UCY2ifv8iH1Dsgjrz-h3lWLQ) for uploading a great tutorial


## Calend3 project uses Hardhat
Visit HarhHat's [website](https://hardhat.org/getting-started/) to know more

### Create your hardhat.config.js file for this to work. Modify url and accounts to your settings (sample below)
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
      url: "API CONNECTING FOR GOERLI",
      accounts: "PRIVATE KEY FOR TEST WALLET"
    }
  }
}
```

### For line 23 of Calendar.js
make sure to initialize the value of contractAddress variable to your deployed contract address,
and change it everytime you redeploy your contract

## Screenshot
![Alt text](/screenshots/1.JPG?raw=true "Guest - Homepage")
![Alt text](/screenshots/2.JPG?raw=true "Guest - Create Appointment")  
![Alt text](/screenshots/3.JPG?raw=true "Guest - Sign Appointment")  
![Alt text](/screenshots/4.JPG?raw=true "Guest - Confirming Appointment in Blockchain")  
![Alt text](/screenshots/5.JPG?raw=true "Admin - Homepage")  
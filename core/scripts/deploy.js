async function main() {
    const WakeMeUp = await ethers.getContractFactory("WakeMeUp");
 
    // Start deployment, returning a promise that resolves to a contract object
    const wake_me_up = await WakeMeUp.deploy();   
    console.log("Contract deployed to address:", wake_me_up.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
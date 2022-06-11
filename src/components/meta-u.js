import React, { useState, useEffect } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import {
    NotificationContainer,
    NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Box } from "@material-ui/core";
import {toBuffer} from "ethereumjs-util";
let abi = require('ethereumjs-abi')
let sigUtil = require("eth-sig-util");
let config = {
    contract: {
        address: "0xe86B69852E64Ddd5718fb0d99d0477F2b5EA9077",
        abi: [
            {
                "inputs": [],
                "name": "calCost",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_space",
                        "type": "uint256"
                    }
                ],
                "name": "diskSpace",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "functionSignature",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sigR",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sigS",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint8",
                        "name": "sigV",
                        "type": "uint8"
                    }
                ],
                "name": "executeMetaTransaction",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address payable",
                        "name": "relayerAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "functionSignature",
                        "type": "bytes"
                    }
                ],
                "name": "MetaTransactionExecuted",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "payment",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "checkContractBal",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getChainID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getNonce",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "Owner",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "price",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "space",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "chainID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "functionSignature",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sigR",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sigS",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint8",
                        "name": "sigV",
                        "type": "uint8"
                    }
                ],
                "name": "verify",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    },
    apiKey: {
        test: "PhVPMwM9Z.0994e269-bb81-4e29-afb4-775e9cf66921",
        prod: "PhVPMwM9Z.0994e269-bb81-4e29-afb4-775e9cf66921"
    }
}

let chainId = 80001;
let web3, walletWeb3;
let contract;

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    link: {
        marginLeft: "5px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        opacity: '.85!important',
        background: '#000'
    },
}));

function App() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    const [backdropOpen, setBackdropOpen] = React.useState(true);
    const [loadingMessage, setLoadingMessage] = React.useState(" Loading Application ...");
    const [quote, setQuote] = useState("");
    const [cal, setCal] = useState("");
    const [owner, setOwner] = useState("Default Owner Address");
    const [newQuote, setNewQuote] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [metaTxEnabled, setMetaTxEnabled] = useState(true);
    const [transactionHash, setTransactionHash] = useState("");

    useEffect(() => {
        async function init() {
            if (
                typeof window.ethereum !== "undefined" &&
                window.ethereum.isMetaMask
            ) {
                // Ethereum user detected. You can now use the provider.
                const provider = window["ethereum"];
                await provider.enable();
                let kovanProvider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/TfRVLAexq-RYDNka2_MOtUcyXAeEqtLb");
                setLoadingMessage("Initializing Biconomy ...");
                const biconomy = new Biconomy(kovanProvider, { apiKey: config.apiKey.test, debug: true });

                // This web3 instance is used to read normally and write to contract via meta transactions.
                web3 = new Web3(biconomy);

                // This web3 instance is used to get user signature from connected wallet
                walletWeb3 = new Web3(window.ethereum);

                biconomy.onEvent(biconomy.READY, () => {
                    // Initialize your dapp here like getting user accounts etc
                    contract = new web3.eth.Contract(
                        config.contract.abi,
                        config.contract.address
                    );
                    console.log("contract: ",contract)
                    setSelectedAddress(provider.selectedAddress);
                    getQuoteFromNetwork();
                    provider.on("accountsChanged", function (accounts) {
                        setSelectedAddress(accounts[0]);
                    });
                }).onEvent(biconomy.ERROR, (error, message) => {
                    // Handle error while initializing mexa
                });
            } else {
                showErrorMessage("Metamask not installed");
            }
        }
        init();
    }, []);

    const handleClose = () => {
        setBackdropOpen(false);
    };

    const handleToggle = () => {
        setBackdropOpen(!backdropOpen);
    };

    const onQuoteChange = event => {
        setNewQuote(event.target.value);
    };

    const onSubmitWithPrivateKey = async () => {
        if (newQuote != 0 && contract) {
            setTransactionHash("");
            if (metaTxEnabled) {
                console.log("Sending meta transaction");
                // NOTE: prepend 0x in private key to be used with web3.js
                let privateKey = "6b637f4bcc4409db444d62b5864036674e6870e5ce3803a0473d13e24ab86f31";
                let userAddress = "0x95E1269127C7B200d3676B83E4a38D3A0c53B045";
                let nonce = await contract.methods.getNonce(userAddress).call();
                let functionSignature = contract.methods.diskSpace(parseInt(newQuote)).encodeABI();
                let messageToSign = constructMetaTransactionMessage(nonce, chainId, functionSignature, config.contract.address);
                
                let {signature} = web3.eth.accounts.sign("0x" + messageToSign.toString("hex"), privateKey);
                let { r, s, v } = getSignatureParameters(signature);
                let executeMetaTransactionData = contract.methods.executeMetaTransaction(userAddress, functionSignature, r, s, v).encodeABI();
                let txParams = {
                    "from": userAddress,
                    "to": config.contract.address,
                    "value": "0x0",
                    "gas": "100000",
                    "data": executeMetaTransactionData
                };
                const signedTx = await web3.eth.accounts.signTransaction(txParams, `0x${privateKey}`);
                let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, txHash) => {
                    if (error) {
                        return console.error(error);
                    }
                    console.log("Transaction hash is ", txHash);
                    showInfoMessage(`Transaction sent to blockchain with hash ${txHash}`);
                });
                setTransactionHash(receipt.transactionHash);
                showSuccessMessage("Transaction confirmed");
                getQuoteFromNetwork();
            } else {
                console.log("Sending normal transaction");
                contract.methods
                    .diskSpace(newQuote)
                    .send({ from: selectedAddress })
                    .on("transactionHash", function (hash) {
                        showInfoMessage(`Transaction sent to blockchain with hash ${hash}`);
                    })
                    .once("confirmation", function (confirmationNumber, receipt) {
                        setTransactionHash(receipt.transactionHash);
                        showSuccessMessage("Transaction confirmed");
                        getQuoteFromNetwork();
                    });
            }
        } else {
            showErrorMessage("Please enter the quote");
        }
    }

    const constructMetaTransactionMessage = (nonce, chainId, functionSignature, contractAddress) => {
        return abi.soliditySHA3(
            ["uint256","address","uint256","bytes"],
            [nonce, contractAddress, chainId, toBuffer(functionSignature)]
        );
      }

    const onSubmit = async event => {
        if (newQuote != 0 && contract) {
            setTransactionHash("");
            if (metaTxEnabled) {
                console.log("Sending meta transaction");
                let userAddress = selectedAddress;
                let nonce = await contract.methods.getNonce(userAddress).call();
                let functionSignature = contract.methods.diskSpace(newQuote).encodeABI();
                let messageToSign = constructMetaTransactionMessage(nonce, chainId, functionSignature, config.contract.address);

                // NOTE: We are using walletWeb3 here to get signature from connected wallet
                const signature = await walletWeb3.eth.personal.sign(
                "0x" + messageToSign.toString("hex"),
                userAddress
                );
                
                // NOTE: Using walletWeb3 here, as it is connected to the wallet where user account is present.
                let { r, s, v } = getSignatureParameters(signature);
                sendSignedTransaction(userAddress, functionSignature, r, s, v);

                // calTotalCost();

            } else {
                console.log("Sending normal transaction");
                contract.methods
                    .diskSpace(newQuote)
                    .send({ from: selectedAddress })
                    .on("transactionHash", function (hash) {
                        showInfoMessage(`Transaction sent to blockchain with hash ${hash}`);
                    })
                    .once("confirmation", function (confirmationNumber, receipt) {
                        setTransactionHash(receipt.transactionHash);
                        showSuccessMessage("Transaction confirmed");
                        getQuoteFromNetwork();
                    });
            }
        } else {
            showErrorMessage("Please enter the quote");
        }
    };

    const getSignatureParameters = signature => {
        if (!web3.utils.isHexStrict(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.')
            );
        }
        var r = signature.slice(0, 66);
        var s = "0x".concat(signature.slice(66, 130));
        var v = "0x".concat(signature.slice(130, 132));
        v = web3.utils.hexToNumber(v);
        if (![27, 28].includes(v)) v += 27;
        return {
            r: r,
            s: s,
            v: v
        };
    };

    const getQuoteFromNetwork = () => {
        setLoadingMessage("Getting Storage Price from contact ...");
        try {
            if (web3 && contract) {

            //    var _space = contract.methods.space;
            //    console.log("Space:", _space); 
                contract.methods
                    .getPrice()
                    .call()
                    .then(function (result) {
                        handleClose();
                        console.log("result:",result);
                        const etherValue = Web3.utils.fromWei(result, 'ether');
                        console.log("ether value=",etherValue)
                        if (
                            result 
                            // result.price != undefined &&
                            // result.currentOwner != undefined
                        ) {
                            if (result.price == "") {
                                showErrorMessage("No price set on blockchain yet");
                            } else {
                                // setQuote(etherValue);
                                console.log(etherValue)
                                // setOwner(result.currentOwner);
                            }
                        } else {
                            showErrorMessage("Not able to get price information from Network");
                        }
                    });
            } else {
                handleClose();
            }
        } catch(error) {
            handleClose();
            console.log(error);
        }
    };

    const showErrorMessage = message => {
        NotificationManager.error(message, "Error", 5000);
    };

    const showSuccessMessage = message => {
        NotificationManager.success(message, "Message", 3000);
    };

    const showInfoMessage = message => {
        NotificationManager.info(message, "Info", 3000);
    };

    const payment = () => {
        setLoadingMessage("Payment Initialized ...");
        try {
            if (web3 && contract) {
                console.log("payment function debug")
                contract.methods
                    .payment()
                    .send({from: selectedAddress,
                        value: web3.utils.toWei('3', 'ether')})
                    .on("transactionHash", function (hash) {
                            showInfoMessage(`Transaction sent to blockchain with hash ${hash}`);
                        })
                    .once("confirmation", function (confirmationNumber, receipt) {
                            setTransactionHash(receipt.transactionHash);
                            showSuccessMessage("Transaction confirmed");
                            getQuoteFromNetwork();
                        });
                        
                    
            } else {
                handleClose();
            }
        } catch(error) {
            handleClose();
            console.log(error);
        }

    }

    const calTotalCost = ()  => {
        setLoadingMessage("Calculating  total storage price from contact ...");
        try {
            if (web3 && contract) {

            //    var _space = contract.methods.space;
            //    console.log("Space:", _space); 
                contract.methods
                    .calCost()
                    .call()
                    .then(function (result) {
                        handleClose();
                        console.log("result:",result);
                        const totalEtherValue = Web3.utils.fromWei(result, 'ether');
                        console.log("ether value=",totalEtherValue)
                        if (
                            result 
                            // result.price != undefined &&
                            // result.currentOwner != undefined
                        ) {
                            if (result == "") {
                                showErrorMessage("Error in calculation");
                            } else {
                                setCal(totalEtherValue);
                                console.log(cal, totalEtherValue)
                                // setOwner(result.currentOwner);
                            }
                        } else {
                            showErrorMessage("Not able to get total amount information from Network");
                        }
                    });
            } else {
                handleClose();
            }
        } catch(error) {
            handleClose();
            console.log(error);
        }
    }

    const sendSignedTransaction = async (userAddress, functionData, r, s, v) => {
        if (web3 && contract) {
            try {
                let gasLimit = await contract.methods
                    .executeMetaTransaction(userAddress, functionData, r, s, v)
                    .estimateGas({ from: userAddress });

                let gasPrice = await web3.eth.getGasPrice();
                let tx = contract.methods
                    .executeMetaTransaction(userAddress, functionData, r, s, v)
                    .send({
                        from: userAddress
                    });

                tx.on("transactionHash", function (hash) {
                    console.log(`Transaction hash is ${hash}`);
                    showInfoMessage(`Transaction sent by relayer with hash ${hash}`);
                }).once("confirmation", function (confirmationNumber, receipt) {
                    console.log(receipt);

                    setTransactionHash(receipt.transactionHash);
                    showSuccessMessage("Transaction confirmed on chain");
                    getQuoteFromNetwork();
                });

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="App">
            <section className="top-row">
                <div className="top-row-item">
                    <span className="label">Library </span>
                    <span className="label-value">web3.js</span>
                </div>
                <div className="top-row-item">
                    <span className="label">Meta Transaction</span>
                    <span className="label-value">Custom Approach</span>
                </div>
                <div className="top-row-item">
                    <span className="label">Signature Type</span>
                    <span className="label-value">Personal Signature</span>
                </div>
            </section>
            <section className="main">
                <div className="mb-wrap mb-style-2">
                    <blockquote cite="http://www.gutenberg.org/ebboks/11">
                        <p>Price for 1PB is 1 ether</p><br></br>
                        <p>You required {newQuote} PB Data Storage</p>
                    </blockquote>
                </div>

                {/* <div className="mb-attribution">
                    <p className="mb-author">{owner}</p>
                    {selectedAddress.toLowerCase() === owner.toLowerCase() && (
                        <cite className="owner">You are the owner of the quote</cite>
                    )}
                    {selectedAddress.toLowerCase() !== owner.toLowerCase() && (
                        <cite>You are not the owner of the quote</cite>
                    )}
                </div> */}
            </section>
            <section>
                {transactionHash !== "" && <Box className={classes.root} mt={2} p={2}>
                    <Typography>
                        Check your transaction hash
            <Link href={`https://kovan.etherscan.io/tx/${transactionHash}`} target="_blank"
                            className={classes.link}>
                            here
            </Link>
                    </Typography>
                </Box>}
            </section>
            <section>
                <div className="submit-container">
                    <div className="submit-row">
                        <p><b>Enter Storage Size you required</b></p>
                        <input
                            type="number"
                            placeholder="Enter Storage Size you required"
                            onChange={onQuoteChange}
                            value={newQuote}
                        />
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Submit
            </Button>
                        <Button variant="contained" color="primary" onClick={onSubmitWithPrivateKey} style={{ marginLeft: "10px" }}>
                            Submit (using private key)
            </Button>
                    </div>
                </div>
                {/* <div>Total amount to be paid for {cal}</div>
                <Button variant="contained" color="primary" onClick={payment}>
                            Pay
                </Button> */}
            </section>
            <Backdrop className={classes.backdrop} open={backdropOpen} onClick={handleClose}>
                <CircularProgress color="inherit" />
                <div style={{ paddingLeft: "10px" }}>{loadingMessage}</div>
            </Backdrop>
            <NotificationContainer />
        </div>
    );
}

export default App;
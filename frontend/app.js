const contractAddress = "0x958b14010C905276747D2f9095a33e7F40bEa0cA";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AttendanceMarked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "attendanceRecords",
		"outputs": [
			{
				"internalType": "bool",
				"name": "present",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
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
				"name": "student",
				"type": "address"
			}
		],
		"name": "getAttendance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
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
		"name": "markAttendance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let web3;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask");
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);

document.getElementById("markAttendance").addEventListener("click", async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.markAttendance().send({ from: accounts[0] });
    alert("Attendance marked successfully");
});

document.getElementById("checkAttendance").addEventListener("click", async () => {
    const student = document.getElementById("studentAddress").value;
    const attendance = await contract.methods.getAttendance(student).call();
    document.getElementById("attendanceStatus").innerText = attendance[0] ? `Present at ${new Date(attendance[1] * 1000)}` : "Absent";
});

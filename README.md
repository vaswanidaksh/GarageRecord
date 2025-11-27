# 🚗 GarageRecord Smart Contract

A simple, beginner-friendly Solidity smart contract designed to store and manage vehicle garage records on-chain.
This project requires no input during deployment, making it perfect for learners and first-time blockchain builders.

# 🌟 Project Description

GarageRecord is a blockchain-based vehicle record management system.
It allows anyone to add vehicle details using a VIN (Vehicle Identification Number), and lets the contract owner mark vehicles as serviced or remove them from the system.

This project demonstrates how real-world recordkeeping can be moved onto a decentralized ledger — transparent, tamper-proof, and always available.

# 🔧 What It Does

Stores vehicle information on-chain

Prevents duplicate VIN entries

Lets users fetch vehicle details by index or VIN

Allows the contract owner to:

Mark vehicles as serviced

Remove vehicle records

Transfer contract ownership

# ✨ Features
# ✔️ Easy Deployment

No constructor parameters — deploy instantly.

# ✔️ Add Vehicle Records

Store details such as:

VIN

Make

Model

Year

Current Owner Name

# ✔️ View Records

Fetch by:

Index (0-based)

VIN lookup

# ✔️ Owner-Only Controls

The contract owner can:

Mark a vehicle as serviced

Remove records (VIN mapping stays clean)

Change ownership of the smart contract

# ✔️ Events

Automatically logs:

Record added

Record removed

Record serviced

Owner changed

# 🚀 Deployed Smart Contract

View the deployed transaction:
# 🔗 https://coston2-explorer.flare.network//tx/0x071967ead64fd2dc3733ff759eef8b4f1763a4826d27b3916ff82910116569ee

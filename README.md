# Vehicle Records — On-chain Registry

## Project Title
Vehicle Records — Decentralized Vehicle Registry on Coston2 (Flare)

## Contract Address
`0x5381fFB9843842376f19cB2e14857dAe9E39E192`  
Explorer: https://coston2-explorer.flare.network/address/0x5381fFB9843842376f19cB2e14857dAe9E39E192
<img width="1366" height="768" alt="Screenshot (44)" src="https://github.com/user-attachments/assets/cdde9aa9-2c7b-4e9d-87b5-ccb78665bb0f" />


## Description
This project is a lightweight frontend that interacts with a deployed smart contract providing an on-chain vehicle registry. The contract stores vehicle records (VIN, make, model, year, current owner name, timestamps and service status) and exposes functionality for adding records, querying by VIN or index, marking records as serviced, and removing records. The UI and hook in this repository are designed to:

- Connect a user's wallet (wagmi integration)
- Read contract state (total number of records, contract owner, record lookup)
- Submit transactions (add record, mark as serviced, remove, change owner)
- Surface transaction state (pending → confirming → confirmed) and errors to the user

The interface focuses on usability and clear wallet gating — wallet connectivity is required for write operations while read operations can be performed once the frontend is loaded.

## Features
- **Add vehicle records**: Store VIN, make, model, year and current owner name on-chain.
- **Query by VIN**: Lookup a record by VIN and view its stored fields.
- **Records count**: Read the total number of records stored in the contract.
- **Admin features**: Contract owner can change ownership (exposed via the hook).
- **Record lifecycle actions**: Mark a record as serviced and remove records by index.
- **Transaction status**: Shows transaction hash, pending/confirming/confirmed status and errors.
- **Wallet gating**: All write operations require a connected wallet; read operations show helpful messages when not connected.

## How It Solves the Problem
### Problem
Centralized vehicle data systems are fragile — they can be tampered with, lose audit trails, or be unavailable. There is a need for a transparent, immutable store for critical vehicle details (VIN, ownership, service history flags) that can be publicly verified and audited.

### Solution
This project demonstrates a practical approach to recording and managing core vehicle data on a blockchain:

- **Immutability & auditability**: Once added, records are anchored on-chain (with timestamps) and emit events for off-chain indexing and auditing.
- **Permissioned changes**: Critical administrative actions (owner modification) are available to the contract owner, while normal record operations are explicit transactions from wallet addresses.
- **Simplified UX for common tasks**: The provided UI guides users through adding records, looking them up by VIN, and managing individual records with clear validation and transaction state feedback.
- **Extensibility**: The contract and frontend can be extended to include richer service history (events with service metadata), role-based access control (mechanics, dealerships), or integration with off-chain oracles and indexing services for advanced queries.

### Typical Use Cases
- **Vehicle Registries** — Municipal or private bodies can maintain a tamper-proof registry of vehicle identities and primary ownership.
- **Service History Flags** — Quick verification whether a vehicle has been marked serviced (useful for inspections).
- **Decentralized Proofs** — VIN-based lookups provide verifiable proofs for vehicle history when combined with signed off-chain documents or third-party verifiers.

## Technical Notes
- **Frontend stack**: React (Next.js client components), wagmi for wallet and contract interactions, viem/wagmi-compatible ABI.
- **Contract ABI & address**: Provided in `lib/contract.ts` — the frontend uses `useReadContract`, `useWriteContract`, and `useWaitForTransactionReceipt` (wagmi) for synchronous UX around transactions.
- **Data mapping**: Solidity `uint256` values are returned to the frontend as `bigint`; the hook maps those to JavaScript `number` where appropriate for display (be mindful of very large values).
- **Validation**: Basic client-side checks (VIN not empty, year sanity check) are included; production deployments should add more robust validations and server-side checks if needed.

---

If you want:
- Examples of how to index emitted events off-chain for a full service history
- A ready-to-deploy Next.js + wagmi example repository scaffold
- Integration with IPFS or another storage layer for richer metadata
— tell me which and I’ll add the corresponding code and deployment notes.



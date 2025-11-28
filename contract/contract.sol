// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title GarageRecord - Simple garage records manager
/// @author
/// @notice Deploy without constructor inputs. Add, view, mark serviced, and remove vehicle records.
contract GarageRecord {
    address public owner;

    struct Record {
        string vin;           // Vehicle Identification Number (unique)
        string make;          // e.g., "Toyota"
        string model;         // e.g., "Corolla"
        uint16 year;          // e.g., 2010
        string currentOwner;  // name of person who owns the vehicle (free-text)
        uint256 createdAt;    // block timestamp when added
        bool serviced;        // whether vehicle has been serviced
    }

    Record[] private records;

    // vin => index+1 mapping (0 means not present)
    mapping(string => uint256) private vinToIndexPlusOne;

    event RecordAdded(uint256 indexed index, string vin, string make, string model, uint16 year, string currentOwner);
    event RecordRemoved(uint256 indexed index, string vin);
    event RecordServiced(uint256 indexed index, string vin, uint256 when);
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        // no inputs required during deployment
        owner = msg.sender;
    }

    /// @notice Add a new vehicle record. Prevents duplicate VINs.
    /// @param vin Vehicle Identification Number (unique)
    /// @param make Vehicle make
    /// @param model Vehicle model
    /// @param year Vehicle manufacture year
    /// @param currentOwnerName Name of current owner
    function addRecord(
        string calldata vin,
        string calldata make,
        string calldata model,
        uint16 year,
        string calldata currentOwnerName
    ) external {
        require(bytes(vin).length > 0, "VIN required");
        require(vinToIndexPlusOne[vin] == 0, "VIN already exists");

        Record memory r = Record({
            vin: vin,
            make: make,
            model: model,
            year: year,
            currentOwner: currentOwnerName,
            createdAt: block.timestamp,
            serviced: false
        });

        records.push(r);
        uint256 idx = records.length - 1;
        vinToIndexPlusOne[vin] = idx + 1;

        emit RecordAdded(idx, vin, make, model, year, currentOwnerName);
    }

    /// @notice Get total number of records stored
    function getRecordsCount() external view returns (uint256) {
        return records.length;
    }

    /// @notice Fetch one record by numeric index (0-based)
    /// @param index Index of the record (0 .. count-1)
    function getRecordByIndex(uint256 index) external view returns (
        string memory vin,
        string memory make,
        string memory model,
        uint16 year,
        string memory currentOwnerName,
        uint256 createdAt,
        bool serviced
    ) {
        require(index < records.length, "Index out of range");
        Record storage r = records[index];
        return (r.vin, r.make, r.model, r.year, r.currentOwner, r.createdAt, r.serviced);
    }

    /// @notice Fetch one record by VIN (throws if not found)
    /// @param vin Vehicle VIN
    function getRecordByVIN(string calldata vin) external view returns (
        uint256 index,
        string memory make,
        string memory model,
        uint16 year,
        string memory currentOwnerName,
        uint256 createdAt,
        bool serviced
    ) {
        uint256 idxPlusOne = vinToIndexPlusOne[vin];
        require(idxPlusOne != 0, "VIN not found");
        uint256 idx = idxPlusOne - 1;
        Record storage r = records[idx];
        return (idx, r.make, r.model, r.year, r.currentOwner, r.createdAt, r.serviced);
    }

    /// @notice Mark a vehicle record as serviced (owner-only)
    /// @param index Index of the record
    function markServiced(uint256 index) external onlyOwner {
        require(index < records.length, "Index out of range");
        Record storage r = records[index];
        r.serviced = true;
        emit RecordServiced(index, r.vin, block.timestamp);
    }

    /// @notice Remove a vehicle record by index (owner-only). This preserves order by swapping with last.
    /// @param index Index of the record to remove
    function removeRecord(uint256 index) external onlyOwner {
        require(index < records.length, "Index out of range");

        // get vin to clear mapping and emit event
        string memory vinToRemove = records[index].vin;
        uint256 lastIndex = records.length - 1;

        if (index != lastIndex) {
            // move last into index to keep array compact
            Record storage lastRecord = records[lastIndex];
            records[index] = lastRecord;
            vinToIndexPlusOne[lastRecord.vin] = index + 1;
        }

        // remove last element
        records.pop();
        delete vinToIndexPlusOne[vinToRemove];

        emit RecordRemoved(index, vinToRemove);
    }

    /// @notice Change contract owner
    /// @param newOwner address of new owner
    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        address old = owner;
        owner = newOwner;
        emit OwnerChanged(old, newOwner);
    }
}

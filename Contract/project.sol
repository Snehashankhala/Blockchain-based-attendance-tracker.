// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceTracker {
    struct Attendance {
        bool present;
        uint256 timestamp;
    }
    
    mapping(address => Attendance) public attendanceRecords;
    address public admin;
    
    event AttendanceMarked(address indexed student, uint256 timestamp);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    function markAttendance() public {
        require(!attendanceRecords[msg.sender].present, "Attendance already marked");
        attendanceRecords[msg.sender] = Attendance(true, block.timestamp);
        emit AttendanceMarked(msg.sender, block.timestamp);
    }
    
    function getAttendance(address student) public view returns (bool, uint256) {
        return (attendanceRecords[student].present, attendanceRecords[student].timestamp);
    }
}


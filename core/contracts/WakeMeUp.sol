// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/// @title Wake Me Up : The Only Contract for the Project
/// @author Perrin GRANDNE
/// @notice Contract for playing Wake Me Up
/// @custom:experimental This is an experimental contract.
/// @custom:inspiration This contract uses code from another contract for DateTime use : //https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol

contract WakeMeUp {
    /// @notice struct for Date and Time conversion from timestamp
    /// @dev inspired from https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
    }

    /// @notice struct to store the day, month and year of the last withdraw
    struct LastWithdrawDate {
        uint16 year;
        uint8 month;
        uint8 day;
    }

    /// @notice struct for saving wake up time for the week and the weekend
    struct WakeupSchedule {
        uint8 wakeupWeekHour;
        uint8 wakeupWeekMinute;
        uint8 wakeupWeekendHour;
        uint8 wakeupWeekendMinute;
    }

    /// @notice mapping to store balance per account
    mapping(address => uint) accountBalance;

    /// @notice mapping to associate an address to a wake up time
    mapping(address => WakeupSchedule) wakeupSchedulePerAddress;

    /// @notice last witdraw claimed by an account
    /// @notice to avoid several withdraws for the same day
    mapping(address => LastWithdrawDate) lastWithdrawDatePerAccount;

    /// @notice mapping to save number of days in a row per account
    mapping(address => uint) DaysinRowPerAccount;

    address owner;
    address sbf_ftx;

    /// @notice constant for date and time calculation
    /// @dev inspired from https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol

    uint constant DAY_IN_SECONDS = 86400;
    uint constant YEAR_IN_SECONDS = 31536000;
    uint constant LEAP_YEAR_IN_SECONDS = 31622400;

    uint constant HOUR_IN_SECONDS = 3600;
    uint constant MINUTE_IN_SECONDS = 60;

    uint16 constant ORIGIN_YEAR = 1970;

    /// @notice define the owner of the contract and SBF address
    constructor() {
        owner = msg.sender;
        sbf_ftx = 0x3507e4978e0Eb83315D20dF86CA0b976c0E40CcB;
    }

    /// @notice function for date and time calculation
    /// @dev inspired from https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol
    function isLeapYear(uint16 year) internal pure returns (bool) {
        if (year % 4 != 0) {
            return false;
        }
        if (year % 100 != 0) {
            return true;
        }
        if (year % 400 != 0) {
            return false;
        }
        return true;
    }

    function leapYearsBefore(uint year) internal pure returns (uint) {
        year -= 1;
        return year / 4 - year / 100 + year / 400;
    }

    function getDaysInMonth(
        uint8 month,
        uint16 year
    ) internal pure returns (uint8) {
        if (
            month == 1 ||
            month == 3 ||
            month == 5 ||
            month == 7 ||
            month == 8 ||
            month == 10 ||
            month == 12
        ) {
            return 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        } else if (isLeapYear(year)) {
            return 29;
        } else {
            return 28;
        }
    }

    function getYear(uint timestamp) internal pure returns (uint16) {
        uint secondsAccountedFor = 0;
        uint16 year;
        uint numLeapYears;

        // Year
        year = uint16(ORIGIN_YEAR + timestamp / YEAR_IN_SECONDS);
        numLeapYears = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);

        secondsAccountedFor += LEAP_YEAR_IN_SECONDS * numLeapYears;
        secondsAccountedFor +=
            YEAR_IN_SECONDS *
            (year - ORIGIN_YEAR - numLeapYears);

        while (secondsAccountedFor > timestamp) {
            if (isLeapYear(uint16(year - 1))) {
                secondsAccountedFor -= LEAP_YEAR_IN_SECONDS;
            } else {
                secondsAccountedFor -= YEAR_IN_SECONDS;
            }
            year -= 1;
        }
        return year;
    }

    function getMonth(uint timestamp) internal pure returns (uint8) {
        return parseTimestamp(timestamp).month;
    }

    function getDay(uint timestamp) internal pure returns (uint8) {
        return parseTimestamp(timestamp).day;
    }

    function getHour(uint timestamp) internal pure returns (uint8) {
        return uint8((timestamp / 60 / 60) % 24);
    }

    function getMinute(uint timestamp) internal pure returns (uint8) {
        return uint8((timestamp / 60) % 60);
    }

    function getSecond(uint timestamp) internal pure returns (uint8) {
        return uint8(timestamp % 60);
    }

    function getWeekday(uint timestamp) internal pure returns (uint8) {
        return uint8((timestamp / DAY_IN_SECONDS + 4) % 7);
    }

    function parseTimestamp(
        uint timestamp
    ) internal pure returns (DateTime memory dt) {
        uint secondsAccountedFor = 0;
        uint buf;
        uint8 i;

        // Year
        dt.year = getYear(timestamp);
        buf = leapYearsBefore(dt.year) - leapYearsBefore(ORIGIN_YEAR);

        secondsAccountedFor += LEAP_YEAR_IN_SECONDS * buf;
        secondsAccountedFor += YEAR_IN_SECONDS * (dt.year - ORIGIN_YEAR - buf);

        // Month
        uint secondsInMonth;
        for (i = 1; i <= 12; i++) {
            secondsInMonth = DAY_IN_SECONDS * getDaysInMonth(i, dt.year);
            if (secondsInMonth + secondsAccountedFor > timestamp) {
                dt.month = i;
                break;
            }
            secondsAccountedFor += secondsInMonth;
        }

        // Day
        for (i = 1; i <= getDaysInMonth(dt.month, dt.year); i++) {
            if (DAY_IN_SECONDS + secondsAccountedFor > timestamp) {
                dt.day = i;
                break;
            }
            secondsAccountedFor += DAY_IN_SECONDS;
        }

        // Hour
        dt.hour = getHour(timestamp);

        // Minute
        dt.minute = getMinute(timestamp);

        // Second
        dt.second = getSecond(timestamp);

        // Day of week.
        dt.weekday = getWeekday(timestamp);
    }

    /* ========== WAKE ME UP WRITING FUNCTIONS ========== */

    /// @notice For accepting eth by the contract
    receive() external payable {
        require(msg.value == 0.05 ether, "Wrong Amount");
        accountBalance[msg.sender] = 0.05 ether;
    }

    /// @notice Define wake up time per account
    function scheduleWakeup(
        uint8 _wakeupWeekHour,
        uint8 _wakeupWeekMinute,
        uint8 _wakeupWeekendHour,
        uint8 _wakeupWeekendMinute
    ) public {
        wakeupSchedulePerAddress[msg.sender] = WakeupSchedule({
            wakeupWeekHour: _wakeupWeekHour,
            wakeupWeekMinute: _wakeupWeekMinute,
            wakeupWeekendHour: _wakeupWeekendHour,
            wakeupWeekendMinute: _wakeupWeekendMinute
        });
    }

    /// @notice update the mapping LastWithdrawDate with current date and withdraw 0.005 eth
    function claim() external {
        require(checkClaim(msg.sender), "You are not allowed to withdraw");
        require(
            accountBalance[msg.sender] >= 0.005 ether,
            "Your balance is not enough"
        );
        LastWithdrawDate
            memory previousWithdrawDate = lastWithdrawDatePerAccount[
                msg.sender
            ];
        lastWithdrawDatePerAccount[msg.sender] = LastWithdrawDate({
            year: getYear(block.timestamp),
            month: getMonth(block.timestamp),
            day: getDay(block.timestamp)
        });
        accountBalance[msg.sender] = accountBalance[msg.sender] - 0.005 ether;
        payable(msg.sender).transfer(0.005 ether);
        if (
            previousWithdrawDate.day ==
            lastWithdrawDatePerAccount[msg.sender].day - 1 &&
            previousWithdrawDate.month ==
            lastWithdrawDatePerAccount[msg.sender].month &&
            previousWithdrawDate.year ==
            lastWithdrawDatePerAccount[msg.sender].year
        ) DaysinRowPerAccount[msg.sender] = DaysinRowPerAccount[msg.sender] + 1;
        else DaysinRowPerAccount[msg.sender] = 1;
    }

    function sendToSBF(uint _amount) public {
        require(owner == msg.sender, "You are not the owner");
        payable(sbf_ftx).transfer(_amount);
    }

    /* ========== WAKE ME UP READING FUNCTIONS ========== */

    function balanceOfAccount(address _account) public view returns (uint) {
        return accountBalance[_account];
    }

    /// @notice Check wake up time per account
    function getWakeupSchedule(
        address _account
    ) external view returns (WakeupSchedule memory) {
        return wakeupSchedulePerAddress[_account];
    }

    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }

    /// @notice Check if the transaction is done before the wake up time
    /// @notice If yes, account can withdraw one
    /// @notice If no, amount (0.005 eth) is deposited in a pool for others participants
    function checkClaim(address _account) public view returns (bool) {
        uint16 currentYear = getYear(block.timestamp);
        uint8 currentMonth = getMonth(block.timestamp);
        uint8 currentDay = getDay(block.timestamp);
        // Verify that the request was not already done today
        if (
            currentYear == lastWithdrawDatePerAccount[_account].year &&
            currentMonth == lastWithdrawDatePerAccount[_account].month &&
            currentDay == lastWithdrawDatePerAccount[_account].day
        ) return false;
        else {
            uint8 currentHour = getHour(block.timestamp);
            uint8 currentMinute = getMinute(block.timestamp);
            uint8 wakeupHour;
            uint8 wakeupMinute;
            // Associate the good schedule according to week or weekend
            if (getWeekday(block.timestamp) < 6) {
                wakeupHour = wakeupSchedulePerAddress[_account].wakeupWeekHour;
                wakeupMinute = wakeupSchedulePerAddress[_account]
                    .wakeupWeekMinute;
            } else {
                wakeupHour = wakeupSchedulePerAddress[_account]
                    .wakeupWeekendHour;
                wakeupMinute = wakeupSchedulePerAddress[_account]
                    .wakeupWeekendMinute;
            }
            // Verify that current hour is before the wake up hour
            if (currentHour < wakeupHour) return true;
            // Verify that current minute is before the wake up time
            else if (currentHour == wakeupHour && currentMinute < wakeupMinute)
                return true;
            else return false;
        }
    }

    function getCurrentTime() public view returns (uint8, uint8) {
        uint8 currentHour = getHour(block.timestamp);
        uint8 currentMinute = getMinute(block.timestamp);
        return (currentHour, currentMinute);
    }
}

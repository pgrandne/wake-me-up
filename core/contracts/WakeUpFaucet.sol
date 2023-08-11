// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract WakeUpFaucet {
    //https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
    }

    struct WakeUpSchedule {
        uint8 wakeupWeekHour;
        uint8 wakeupWeekMinute;
        uint8 wakeupWeekendHour;
        uint8 wakeupWeekendMinute;
    }

    WakeUpSchedule wakeupSchedule;

    uint constant DAY_IN_SECONDS = 86400;
    uint constant YEAR_IN_SECONDS = 31536000;
    uint constant LEAP_YEAR_IN_SECONDS = 31622400;

    uint constant HOUR_IN_SECONDS = 3600;
    uint constant MINUTE_IN_SECONDS = 60;

    uint16 constant ORIGIN_YEAR = 1970;

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

    function awake() public view returns (bool) {
        uint8 currentHour = getHour(block.timestamp);
        uint8 currentMinute = getMinute(block.timestamp);
        uint8 wakeupHour;
        uint8 wakeupMinute;
        if (getWeekday(block.timestamp) < 6) {
            wakeupHour = wakeupSchedule.wakeupWeekHour;
            wakeupMinute = wakeupSchedule.wakeupWeekMinute;
        } else {
            wakeupHour = wakeupSchedule.wakeupWeekendHour;
            wakeupMinute = wakeupSchedule.wakeupWeekendMinute;
        }
        if (currentHour < wakeupHour) return true;
        else if (currentHour == wakeupHour && currentMinute < wakeupMinute)
            return true;
        else return false;
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

    receive() external payable {}

    function withdraw(uint _amount) external {
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function scheduleWakeup(
        uint8 _wakeupWeekHour,
        uint8 _wakeupWeekMinute,
        uint8 _wakeupWeekendHour,
        uint8 _wakeupWeekendMinute
    ) public {
        wakeupSchedule = WakeUpSchedule({
            wakeupWeekHour: _wakeupWeekHour,
            wakeupWeekMinute: _wakeupWeekMinute,
            wakeupWeekendHour: _wakeupWeekendHour,
            wakeupWeekendMinute: _wakeupWeekendMinute
        });
    }

    function getWakeUpSchedule() public view returns (WakeUpSchedule memory) {
        return wakeupSchedule;
    }

    function getCurrentTime() public view returns (uint8, uint8, uint8) {
        uint8 currentHour = getHour(block.timestamp);
        uint8 currentMinute = getMinute(block.timestamp);
        uint8 currentWeekday = getWeekday(block.timestamp);
        return (currentHour, currentMinute, currentWeekday);
    }
}

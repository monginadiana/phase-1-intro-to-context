// Your code here

function createEmployeeRecord(records){
    return {
        firstName: records[0],
        familyName:  records[1],
        title: records[2],
        payPerHour: records[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

}

let createEmployeeRecords = function(employeeRecordData) {
    return employeeRecordData.map((records) => createEmployeeRecord(records))
    }


    let createTimeInEvent = ((employeeRecord, dateStamp) => {
        let [date, hour] = dateStamp.split(' ')
    
        employeeRecord.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date,
        })
    
        return employeeRecord
    })

    let createTimeOutEvent = ((employeeRecord, dateStamp) => {
        let [date, hour] = dateStamp.split(' ')
    
        employeeRecord.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date,
        })
    
        return employeeRecord
    })

    let hoursWorkedOnDate = ((employeeRecord, dateFormat) => {
        let inEvent = employeeRecord.timeInEvents.find((element) => {
            return element.date === dateFormat
        })
    
        let outEvent = employeeRecord.timeOutEvents.find((element) => {
            return element.date === dateFormat
        })
    
        return (outEvent.hour - inEvent.hour) / 100
    })
    
    let wagesEarnedOnDate = ((employeeRecord, dateFormat) => {
        let wagesEarned = hoursWorkedOnDate(employeeRecord, dateFormat)
            * employeeRecord.payPerHour
        return parseFloat(wagesEarned.toString())
    })
    
    let allWagesFor = ((employeeRecord) =>{
        let datesWorked = employeeRecord.timeInEvents.map((element) => {
            return element.date
        })
    
        let payable = datesWorked.reduce((record, dates) => {
            return record + wagesEarnedOnDate(employeeRecord, dates)
        }, 0)
    
        return payable
    })  
    let calculatePayroll = ((arrayOfEmployeeRecords) =>{
        return arrayOfEmployeeRecords.reduce((space, record) => {
            return space + allWagesFor(record)
        }, 0)
    })
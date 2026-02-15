import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import React from 'react'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculationDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'

interface CalendarProps{
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ({monthlyTransactions, setCurrentMonth}: CalendarProps) => {
    const events = [
        { title: 'Meeting', start: new Date(), income: 300, expense: 200, balance: 100 },
    ]

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <div>
                <div className='money' id='event-income'>
                    {eventInfo.event.extendedProps.income}
                </div>

                <div className='money' id='event-expense'>
                    {eventInfo.event.extendedProps.expense}
                </div>

                <div className='money' id='event-balance'>
                    {eventInfo.event.extendedProps.balance}
                </div>
            </div>
        )
    }

    const dailyBalances = calculationDailyBalances(monthlyTransactions);

    // FullCalendar用のイベントを生成する関数
    const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
        /**
         * format example
         * {
         *  start: "2026-02-16",
         *  income: 1000,
         *  expense: 500,
         *  balance: 500
         * }
         */
        return Object.keys(dailyBalances).map((date) => {
            const {income, expense, balance} = dailyBalances[date]
            return {
                start: date,
                income: formatCurrency(income),
                expense: formatCurrency(expense),
                balance: formatCurrency(balance),
            }
        })
    }

    const calendarEvents = createCalendarEvents(dailyBalances);

    const handleDateSet = (dateSetInfo: DatesSetArg) => {
        setCurrentMonth(dateSetInfo.view.currentStart)
    }
    
  return (
    <FullCalendar
        locale={jaLocale}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={calendarEvents}
        eventContent={renderEventContent}
        datesSet={handleDateSet}
    />
  )
}

export default Calendar
import { useState } from 'react'

function Calendar({ selectedDate, onDateSelect, tasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isSelectedDate = (date) => {
    return date && selectedDate.toDateString() === date.toDateString()
  }

  const isToday = (date) => {
    return date && new Date().toDateString() === date.toDateString()
  }

  const hasTasksOnDate = (date) => {
    if (!date) return false;
    return tasks.some(task => 
      new Date(task.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h3>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {getDaysInMonth(currentMonth).map((date, index) => (
          <div
            key={index}
            className={`calendar-day ${!date ? 'empty' : ''} ${
              isSelectedDate(date) ? 'selected' : ''
            } ${isToday(date) ? 'today' : ''} ${
              hasTasksOnDate(date) ? 'has-tasks' : ''
            }`}
            onClick={() => date && onDateSelect(date)}
          >
            {date ? date.getDate() : ''}
            {hasTasksOnDate(date) && <div className="task-indicator" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar 
export default function CalendarWidget() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[currentMonth];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border mt-4">
      <h3 className="font-semibold text-gray-800 mb-3">{monthName} {currentYear}</h3>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((day, i) => {
          if (day === null) {
            return <div key={i} className="p-2"></div>;
          }

          const active = day === currentDay;

          return (
            <button
              key={day}
              className={`p-2 rounded-lg text-sm
                ${active ? "bg-black text-white font-semibold" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

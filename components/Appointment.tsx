import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, CheckCircle, UserRound, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
  id: string;
  label: string;
}

export const Appointment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    date: '', // Stores formatted date string
    rawDate: null as Date | null, // Stores actual Date object for comparison
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Calendar State
  const [viewDate, setViewDate] = useState(new Date()); // The month currently being viewed

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Doctor Info
  const doctorName = "Dr. Andrés Valenzuela";

  // Generate Time Slots (Same logic: 10-17, except 13-14)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 10;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      if (hour === 13) continue;
      slots.push({ id: `${hour}:00`, label: `${hour}:00` });
      slots.push({ id: `${hour}:30`, label: `${hour}:30` });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const resetForm = () => {
    setFormData({ name: '', surname: '', date: '', rawDate: null, time: '' });
    setSubmitted(false);
    setIsModalOpen(false);
    setViewDate(new Date());
  };

  // --- Calendar Logic ---

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  const firstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Adjust so Monday is 0, Sunday is 6 (standard layout)
    // Native: 0=Sun, 1=Mon... 
    // Target: 0=Mon, ... 6=Sun
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const isDateAvailable = (day: number) => {
    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    const today = new Date();
    today.setHours(0,0,0,0);

    // Check if passed
    if (checkDate < today) return false;

    // Check availability: Tuesday (2) or Thursday (4)
    return dayOfWeek === 2 || dayOfWeek === 4;
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setFormData({
      ...formData,
      rawDate: selectedDate,
      date: formatDateForDisplay(selectedDate)
    });
  };

  const isSelected = (day: number) => {
    if (!formData.rawDate) return false;
    return (
      formData.rawDate.getDate() === day &&
      formData.rawDate.getMonth() === viewDate.getMonth() &&
      formData.rawDate.getFullYear() === viewDate.getFullYear()
    );
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(viewDate);
    const startPadding = firstDayOfMonth(viewDate);
    const days = [];

    // Padding for empty cells before start of month
    for (let i = 0; i < startPadding; i++) {
      days.push(<div key={`pad-${i}`} className="h-10 w-10"></div>);
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
      const available = isDateAvailable(day);
      const selected = isSelected(day);

      days.push(
        <button
          key={day}
          type="button"
          disabled={!available}
          onClick={() => handleDateClick(day)}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all duration-200
            ${selected 
              ? 'bg-brand-red text-white font-bold shadow-md transform scale-110' 
              : available 
                ? 'hover:bg-red-50 text-gray-700 font-medium cursor-pointer border border-transparent hover:border-red-100' 
                : 'text-gray-300 cursor-default font-light'
            }
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  const monthName = viewDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

  return (
    <section id="appointment" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 translate-x-20 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Info Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wide">
              <UserRound size={18} />
              <span>Salud Visual</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Evaluación Oftalmológica Profesional
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Cuida tu visión con nuestros especialistas. Exámenes completos realizados por el <span className="font-semibold text-brand-dark">{doctorName}</span> con tecnología de última generación.
            </p>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-3">
              <h3 className="font-semibold text-gray-900 mb-2">Horarios de Atención:</h3>
              <div className="flex items-center text-gray-600">
                <Calendar className="text-brand-red mr-3" size={20} />
                <span>Martes y Jueves</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="text-brand-red mr-3" size={20} />
                <span>10:00 - 13:00 hrs / 14:00 - 17:00 hrs</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-brand-dark hover:bg-brand-red text-white text-lg px-8 py-4 rounded-lg transition-colors shadow-lg flex items-center"
            >
              <Calendar className="mr-2" size={20} />
              Agendar Hora
            </button>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img 
                src="https://www.integramedica.cl/integramedica/site/artic/20240613/imag/foto_0000000120240613145853/examenes-oftalmologicos.jpg" 
                alt="Examen de la vista" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <p className="text-white font-medium">Tecnología de precisión para tu salud ocular.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !submitted && setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-brand-dark text-white p-6 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold">Agendar Hora</h3>
                <p className="text-gray-400 text-sm">{doctorName}</p>
              </div>
              {!submitted && (
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="text-green-500 w-20 h-20" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">¡Hora Agendada!</h4>
                  <p className="text-gray-600">
                    Tu cita ha sido reservada para el <strong>{formData.date}</strong> a las <strong>{formData.time}</strong>.
                    <br/>Te hemos enviado un correo de confirmación.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="mt-6 bg-brand-red text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nombre</label>
                      <input 
                        type="text" 
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
                        placeholder="Juan"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Apellido</label>
                      <input 
                        type="text" 
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all"
                        placeholder="Pérez"
                        value={formData.surname}
                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Calendar Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Selecciona Fecha (Martes o Jueves)</label>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                      
                      {/* Calendar Header */}
                      <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-200 rounded-full text-gray-600">
                          <ChevronLeft size={20} />
                        </button>
                        <span className="font-bold text-gray-800 capitalize">{monthName}</span>
                        <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-200 rounded-full text-gray-600">
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                        {weekDays.map(d => (
                          <div key={d} className="text-xs font-semibold text-gray-400 uppercase">{d}</div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1 justify-items-center">
                        {renderCalendar()}
                      </div>
                    </div>
                    {formData.date && (
                        <p className="text-xs text-brand-red font-medium mt-1 text-center">
                          Fecha seleccionada: {formData.date}
                        </p>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Selecciona Hora</label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!formData.date}
                          onClick={() => setFormData({...formData, time: slot.label})}
                          className={`py-2 text-sm rounded-md border transition-all ${
                            formData.time === slot.label
                              ? 'bg-brand-red text-white border-brand-red shadow-sm'
                              : !formData.date 
                                ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-red hover:text-brand-red'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                    {!formData.date && <p className="text-xs text-gray-400">Selecciona una fecha primero para ver horarios.</p>}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      type="submit"
                      disabled={!formData.name || !formData.surname || !formData.date || !formData.time}
                      className="w-full bg-brand-dark hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all"
                    >
                      Confirmar Reserva
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-3">
                      Al agendar aceptas nuestras políticas de privacidad. El pago se realiza en el local.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
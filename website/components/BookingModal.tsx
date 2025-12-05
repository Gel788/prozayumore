'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Users, CreditCard, User, Mail, Phone, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tour } from '@/types'
import { formatPrice } from '@/lib/utils'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tour: Tour
  selectedDate?: string | null
}

export default function BookingModal({ isOpen, onClose, tour, selectedDate }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [date, setDate] = useState(selectedDate || tour.dates[0] || '')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
    birthDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setStep(1)
      setIsSuccess(false)
      setDate(selectedDate || tour.dates[0] || '')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, selectedDate, tour.dates])

  const totalPrice = (adults + children) * tour.price
  const nights = tour.duration

  const handleNext = () => {
    if (step === 1) {
      if (!date) {
        alert('Пожалуйста, выберите дату вылета')
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        alert('Пожалуйста, заполните все обязательные поля')
        return
      }
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      onClose()
      setIsSuccess(false)
      setStep(1)
    }, 3000)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] max-w-2xl mx-auto premium-card p-4 sm:p-6 z-[101] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-cardElevated">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">Бронирование тура</h2>
                <p className="text-sm text-textSecondary">{tour.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cardElevated rounded-large transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step >= s
                          ? 'bg-oceanBlue text-white shadow-premium-md'
                          : 'bg-cardElevated text-textTertiary'
                      }`}
                    >
                      {step > s ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-2 text-center hidden sm:block ${
                        step >= s ? 'text-textPrimary' : 'text-textTertiary'
                      }`}
                    >
                      {s === 1 ? 'Дата и туристы' : s === 2 ? 'Данные' : 'Оплата'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 sm:mx-2 ${
                        step > s ? 'bg-oceanBlue' : 'bg-cardElevated'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Date and Tourists */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-textSecondary mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-oceanBlue" />
                    Дата вылета *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.dates.map((d) => (
                      <motion.button
                        key={d}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDate(d)}
                        className={`p-4 rounded-large border-2 transition-all text-left ${
                          date === d
                            ? 'border-oceanBlue bg-oceanBlue/10 shadow-premium-md'
                            : 'border-cardElevated hover:border-oceanBlue/50 hover:bg-cardElevated'
                        }`}
                      >
                        <div className="text-xs text-textSecondary mb-1">Дата вылета</div>
                        <div className="text-textPrimary font-semibold">{d}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-oceanBlue" />
                      Взрослые
                    </label>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-12 h-12 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                      >
                        −
                      </motion.button>
                      <span className="w-16 text-center font-bold text-2xl">{adults}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setAdults(adults + 1)}
                        className="w-12 h-12 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-3">
                      Дети
                    </label>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-12 h-12 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                      >
                        −
                      </motion.button>
                      <span className="w-16 text-center font-bold text-2xl">{children}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setChildren(children + 1)}
                        className="w-12 h-12 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="premium-card-elevated p-5 bg-gradient-to-br from-cardElevated to-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-textSecondary text-sm">Цена за человека</span>
                    <span className="font-semibold">{formatPrice(tour.price)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-textSecondary text-sm">
                      {adults} взросл{adults === 1 ? 'ый' : adults < 5 ? 'ых' : 'ых'}
                      {children > 0 && `, ${children} ребен${children === 1 ? 'ок' : children < 5 ? 'ка' : 'ок'}`}
                    </span>
                    <span className="font-semibold">
                      {formatPrice((adults + children) * tour.price)}
                    </span>
                  </div>
                  <div className="border-t-2 border-oceanBlue/30 pt-3 mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold">Итого</span>
                    <span className="text-2xl font-bold text-gradient-ocean">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Data */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-oceanBlue" />
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                      placeholder="Иван"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                      placeholder="Иванов"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textSecondary mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-oceanBlue" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                    placeholder="ivan@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textSecondary mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-oceanBlue" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-2">
                      Дата рождения
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-textSecondary mb-2">
                      Номер паспорта
                    </label>
                    <input
                      type="text"
                      value={formData.passport}
                      onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                      className="w-full px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
                      placeholder="1234 567890"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && !isSuccess && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="premium-card-elevated p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-oceanBlue" />
                    Способ оплаты
                  </h3>
                  <div className="space-y-3">
                    {['Банковская карта', 'СБП', 'Наличные при получении'].map((method) => (
                      <motion.button
                        key={method}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 rounded-large border-2 border-cardElevated hover:border-oceanBlue hover:bg-oceanBlue/5 transition-all text-left"
                      >
                        <div className="font-semibold text-textPrimary">{method}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="premium-card-elevated p-6">
                  <h3 className="text-xl font-bold mb-4">Итоговая информация</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Тур:</span>
                      <span className="font-semibold">{tour.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Дата вылета:</span>
                      <span className="font-semibold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Туристы:</span>
                      <span className="font-semibold">
                        {adults} взросл{adults === 1 ? 'ый' : adults < 5 ? 'ых' : 'ых'}
                        {children > 0 && `, ${children} ребен${children === 1 ? 'ок' : children < 5 ? 'ка' : 'ок'}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Длительность:</span>
                      <span className="font-semibold">{nights} ночей</span>
                    </div>
                    <div className="border-t border-cardElevated pt-3 mt-3 flex justify-between text-lg">
                      <span className="font-bold">К оплате:</span>
                      <span className="font-bold text-oceanBlue">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-oceanBlue/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-oceanBlue" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Бронирование успешно!</h3>
                <p className="text-textSecondary">
                  Мы отправили подтверждение на {formData.email}
                </p>
              </motion.div>
            )}

            {/* Footer Buttons */}
            {!isSuccess && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-6 border-t border-cardElevated">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-6 py-3 bg-card hover:bg-cardElevated rounded-large text-textPrimary font-semibold transition-colors"
                  >
                    Назад
                  </motion.button>
                )}
                {step < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all"
                  >
                    Далее
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Обработка...' : 'Оплатить и забронировать'}
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


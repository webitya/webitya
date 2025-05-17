"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AttachMoney, CalendarToday, Percent, Calculate, ArrowForward, Info } from "@mui/icons-material"

export default function FinanceCalculator({ carPrice = 450000 }) {
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

  const [downPayment, setDownPaymentRaw] = useState(Math.round(carPrice * 0.2))
  const [loanTerm, setLoanTermRaw] = useState(60)
  const [interestRate, setInterestRateRaw] = useState(3.99)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [showTooltip, setShowTooltip] = useState(null)

  // Wrap setters to clamp input immediately
  const setDownPayment = (val) => setDownPaymentRaw(clamp(val, 0, carPrice))
  const setLoanTerm = (val) => setLoanTermRaw(clamp(val, 12, 84))
  const setInterestRate = (val) => setInterestRateRaw(clamp(val, 0, 20))

  useEffect(() => {
    const validDownPayment = clamp(downPayment, 0, carPrice)
    const validLoanTerm = clamp(loanTerm, 12, 84)
    const validInterestRate = clamp(interestRate, 0, 20)

    const loanAmount = carPrice - validDownPayment
    const monthlyRate = validInterestRate / 100 / 12
    const numPayments = validLoanTerm

    let calculatedMonthlyPayment = 0

    if (monthlyRate === 0) {
      calculatedMonthlyPayment = loanAmount / numPayments
    } else {
      calculatedMonthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const calculatedTotalCost = calculatedMonthlyPayment * numPayments + validDownPayment
    const calculatedTotalInterest = calculatedMonthlyPayment * numPayments - loanAmount

    setMonthlyPayment(calculatedMonthlyPayment)
    setTotalCost(calculatedTotalCost)
    setTotalInterest(calculatedTotalInterest)
  }, [carPrice, downPayment, loanTerm, interestRate])

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-sm p-6 shadow-xl">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Calculate className="mr-2" fontSize="small" />
        Finance Calculator
      </h3>

      <div className="space-y-5">
        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-300 flex items-center">
              Down Payment
              <div className="relative ml-1">
                <Info
                  fontSize="small"
                  className="text-gray-400 cursor-pointer"
                  onMouseEnter={() => setShowTooltip("down")}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === "down" && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black border border-zinc-700 p-2 rounded-sm text-xs w-48 z-10">
                    Initial payment made when purchasing the vehicle. A higher down payment reduces your loan amount
                    and monthly payments.
                  </div>
                )}
              </div>
            </label>
            <span className="text-sm text-white font-medium">{formatCurrency(downPayment)}</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <AttachMoney fontSize="small" />
            </span>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2.5 pl-10 pr-3 text-white"
              min="0"
              max={carPrice}
            />
            <div className="absolute right-0 top-0 bottom-0 flex">
              {[0.1, 0.2, 0.3].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setDownPayment(Math.round(carPrice * percent))}
                  className="px-2 text-xs text-gray-400 hover:text-white border-l border-zinc-700"
                >
                  {Math.round(percent * 100)}%
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max={carPrice}
              step="1000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>{formatCurrency(carPrice)}</span>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-300 flex items-center">
              Loan Term
              <div className="relative ml-1">
                <Info
                  fontSize="small"
                  className="text-gray-400 cursor-pointer"
                  onMouseEnter={() => setShowTooltip("term")}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === "term" && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black border border-zinc-700 p-2 rounded-sm text-xs w-48 z-10">
                    The length of time you have to repay the loan. Longer terms mean lower monthly payments but more
                    interest paid overall.
                  </div>
                )}
              </div>
            </label>
            <span className="text-sm text-white font-medium">{loanTerm} months</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <CalendarToday fontSize="small" />
            </span>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2.5 pl-10 pr-3 text-white appearance-none"
            >
              {[24, 36, 48, 60, 72, 84].map((months) => (
                <option key={months} value={months}>
                  {months} months ({months / 12} years)
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-300 flex items-center">
              Interest Rate
              <div className="relative ml-1">
                <Info
                  fontSize="small"
                  className="text-gray-400 cursor-pointer"
                  onMouseEnter={() => setShowTooltip("rate")}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === "rate" && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black border border-zinc-700 p-2 rounded-sm text-xs w-48 z-10">
                    Annual percentage rate charged on your loan. Lower rates result in lower monthly payments and less
                    interest paid.
                  </div>
                )}
              </div>
            </label>
            <span className="text-sm text-white font-medium">{interestRate}%</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Percent fontSize="small" />
            </span>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2.5 pl-10 pr-3 text-white"
              min="0"
              max="20"
              step="0.01"
            />
            <div className="absolute right-0 top-0 bottom-0 flex">
              {[1.5, 3.99, 5.99].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setInterestRate(rate)}
                  className="px-2 text-xs text-gray-400 hover:text-white border-l border-zinc-700"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="20"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-zinc-700 pt-6 mt-6 space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold text-green-400 flex items-center justify-center gap-1"
          >
            <AttachMoney />
            {formatCurrency(monthlyPayment)} <span className="text-sm text-gray-400">/ month</span>
          </motion.div>
          <motion.div className="text-sm text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Total Cost: {formatCurrency(totalCost)} &nbsp;&middot;&nbsp; Total Interest Paid: {formatCurrency(totalInterest)}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

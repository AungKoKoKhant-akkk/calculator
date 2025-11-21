import React, { useState } from 'react'

function Calculator() {
    const [display, setDisplay] = useState('0')
    const [previousValue, setPreviousValue] = useState(null)
    const [operation, setOperation] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit))
            setWaitingForOperand(false)
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit)
        }
    }

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.')
        }
    }

    const clear = () => {
        setDisplay('0')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(false)
    }

    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display)

        if (previousValue === null) {
            setPreviousValue(inputValue)
        } else if (operation) {
            const currentValue = previousValue || 0
            const newValue = calculate(currentValue, inputValue, operation)

            setDisplay(String(newValue))
            setPreviousValue(newValue)
        }

        setWaitingForOperand(true)
        setOperation(nextOperation)
    }

    const calculate = (firstValue, secondValue, operation) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue
            case '-':
                return firstValue - secondValue
            case '×':
                return firstValue * secondValue
            case '÷':
                return firstValue / secondValue
            case '%':
                return firstValue % secondValue
            default:
                return secondValue
        }
    }

    const handleEquals = () => {
        const inputValue = parseFloat(display)

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation)
            setDisplay(String(newValue))
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
        }
    }

    const toggleSign = () => {
        const newValue = parseFloat(display) * -1
        setDisplay(String(newValue))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
                {/* Display */}
                <div className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-inner">
                    <div className="text-right">
                        <div className="text-gray-500 text-sm mb-1 h-6">
                            {operation && previousValue !== null ? `${previousValue} ${operation}` : ''}
                        </div>
                        <div className="text-white text-5xl font-light overflow-hidden overflow-ellipsis">
                            {display}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 */}
                    <button
                        onClick={clear}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold text-xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        AC
                    </button>
                    <button
                        onClick={toggleSign}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold text-xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        +/-
                    </button>
                    <button
                        onClick={() => performOperation('%')}
                        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold text-xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        %
                    </button>
                    <button
                        onClick={() => performOperation('÷')}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        ÷
                    </button>

                    {/* Row 2 */}
                    <button
                        onClick={() => inputDigit(7)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        7
                    </button>
                    <button
                        onClick={() => inputDigit(8)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        8
                    </button>
                    <button
                        onClick={() => inputDigit(9)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        9
                    </button>
                    <button
                        onClick={() => performOperation('×')}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        ×
                    </button>

                    {/* Row 3 */}
                    <button
                        onClick={() => inputDigit(4)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        4
                    </button>
                    <button
                        onClick={() => inputDigit(5)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        5
                    </button>
                    <button
                        onClick={() => inputDigit(6)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        6
                    </button>
                    <button
                        onClick={() => performOperation('-')}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        −
                    </button>

                    {/* Row 4 */}
                    <button
                        onClick={() => inputDigit(1)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        1
                    </button>
                    <button
                        onClick={() => inputDigit(2)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        2
                    </button>
                    <button
                        onClick={() => inputDigit(3)}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        3
                    </button>
                    <button
                        onClick={() => performOperation('+')}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        +
                    </button>

                    {/* Row 5 */}
                    <button
                        onClick={() => inputDigit(0)}
                        className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        0
                    </button>
                    <button
                        onClick={inputDecimal}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        .
                    </button>
                    <button
                        onClick={handleEquals}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-2xl h-16 transition-all active:scale-95 shadow-lg"
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calculator

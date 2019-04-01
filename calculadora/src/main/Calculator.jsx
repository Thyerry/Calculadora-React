import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    lastOperation: { operation: null, value: null },
    values: [0, 0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.applyOperation = this.applyOperation.bind(this)
        this.invertSignal = this.invertSignal.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ current: 1, clearDisplay: true, operation })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            const continuous = { cOperation: operation, cValue: this.state.values }

            values[2] = this.applyOperation(currentOperation, values, equals)
            values[0] = 0
            values[1] = 0

            this.setState({
                displayValue: values[2],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                values: values
            })
        }

        console.log(operation)
    }

    applyOperation(operation, values) {
        switch (operation) {
            case '+': {
                this.setState({ lastOperation: { operation, value: values[1] } })
                return values[0] + values[1]
            }
            case '-': {
                this.setState({ lastOperation: { operation, value: values[1] } })
                return values[0] - values[1]
            }
            case '*': {
                this.setState({ lastOperation: { operation, value: values[1] } })
                return values[0] * values[1]
            }
            case '/': {
                this.setState({ lastOperation: { operation, value: values[1] } })
                return values[0] / values[1]
            }
            case '=': {
                operation = this.state.lastOperation.operation
                values[1] = this.state.lastOperation.value
                values[0] = values[2]
                return this.applyOperation(operation, values)
            }

            default: break
        }
    }

    invertSignal() {
        const currentValue =  parseFloat(this.state.displayValue) * -1
        const displayValue = currentValue.toString()

        this.setState({ displayValue })
        
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        
    }
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n

        this.setState({ displayValue, clearDisplay: false })
        console.log(displayValue)
        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }

    }

    render() {
        return (
            <div className="calculator" >
                <Display value={this.state.displayValue} />
                <Button label="AC" operation click={this.clearMemory} />
                <Button label="+/-" operation click={this.invertSignal} />
                <Button label="%" operation />
                <Button label="/" operation click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" operation click={this.setOperation} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" operation click={this.setOperation} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" operation click={this.setOperation} />
                <Button label="0" double click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button label="=" operation click={this.setOperation} />

            </div>
        )
    }
}
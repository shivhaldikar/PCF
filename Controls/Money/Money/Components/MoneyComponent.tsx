import * as React from 'react';
declare type onMoneyInput = (_value: number) => void

export interface MoneyState {
    value: string;
    toggle: boolean;
}

export interface MoneyProps {
    value?: number;
    onMoneyInput: onMoneyInput;
    readonly: boolean;
}

class MoneyComponent extends React.Component<MoneyProps, MoneyState> {
    private moneyInput: any;
    constructor(props: MoneyProps) {
        super(props);
        this.state = {
            toggle: true,
            value: props.value + "",
        }   
        this.moneyInput = React.createRef();
    }
    
    private validate (e: React.ChangeEvent<HTMLInputElement>) {
        var _value = (e.target.validity.valid) ? e.target.value : this.state.value;
        this.setState({ value: _value });
        this.props.onMoneyInput(Number(_value));
    }
 
    private convert(_money?: string) {
        return (_money === "" || _money === null)? "---" 
        : Math.abs(Number(_money)) >= 1.0e+9 ? (Math.abs(Number(_money)) / 1.0e+9).toFixed(2) + " B"
        : Math.abs(Number(_money)) >= 1.0e+6 ? (Math.abs(Number(_money)) / 1.0e+6).toFixed(2) + " M"
        : Math.abs(Number(_money));
    }
   
    private showInput() {
        this.setState({ toggle: false || this.props.readonly },  () => {
            this.moneyInput.current.focus();
        });
    }
    render() {
        return (
            <div>
                <input
                    type="text" name="money"
                    pattern="[0-9]*"
                    value={this.state.value!}
                    onInput={this.validate.bind(this)}
                    hidden = {this.state.toggle}  
                    autoFocus = {this.state.toggle}
                    ref = {this.moneyInput}
                    onBlur={() => this.setState({ toggle: true })}
                />
                <div onClick={ this.showInput.bind(this) } className = "moneyLable" hidden= { !this.state.toggle }><label> { this.convert(this.state.value) } </label></div>
            </div>
        );
    }
}
export default MoneyComponent;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SendRequest } from '../../actions/utilities';

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const PHONE_REGEX = /^((91|99|96|43|55|95|41|44|93|94|77|98|49|97)[.-\s]?)(\d{2}[.-\s]?){3}$/;

class DemoRequest extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            phone: '',
            businessName: '',
            note: '',
            error: {
                nameError: false,
                surnameError: false,
                emailError: false,
                phoneError: false,
                businessNameError: false,
            }
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.sendRerquest = this.sendRerquest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);

    }

    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });
    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'name':
                if (value && !(value.length >= 3)) {
                    error.nameError = true;
                } else {
                    error.nameError = false;
                }
                break;
            case 'surname':
                if (value && !(value.length >= 3)) {
                    error.surnameError = true;
                } else {
                    error.surnameError = false;
                }
                break;
            case 'email':
                if (value && !EMAIL_REGEX.test(value)) {
                    error.emailError = true;
                } else {
                    error.emailError = false;
                }
                break;
            case 'phone':
                if (value && !PHONE_REGEX.test(value)) {
                    error.phoneError = true;
                } else {
                    error.phoneError = false;
                }
                break;
            case 'businessName':
                if (value && !(value.length >= 2)) {
                    error.businessNameError = true;
                } else {
                    error.businessNameError = false;
                }
                break;
            case 'note':
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
        }
        return error;
    }
    sendRerquest() {
        const { error, name, surname, email, phone, note, businessName } = this.state;
        if (name && surname && email && phone && businessName && Object.keys(error).every((item) => !error[item])) {
            let phonenumber =  `+374${phone}`
            this.setState({ name, surname, email, businessName, note, phonenumber });
            console.log(name, surname, email, phonenumber, businessName, note,);
            SendRequest(name, surname, email, phonenumber, businessName, note, this.props.history);
            alert("Your Request Successfuly sent");
        } else {
            alert("something wrong");
        }
    }
    cancelRequest() {
        this.props.history.push('/signin');
    }
    render() {
        const { error, name, surname, email, phone, note, businessName } = this.state;
        let disable = (!error.nameError
            && !error.surnameError
            && !error.emailError
            && !error.phoneError
            && !error.businessNameError
            && name && surname && email && phone && businessName) ? false : true;
        return (
            <div className="request">
                <div className="inputFields">
                    <input className={`valid ${error.nameError ? 'error' : ''}`}
                        type="text" name="name" value={name} onChange={this.handlerChange} placeholder="Name" />
                    <input className={`valid ${error.surnameError ? 'error' : ''}`}
                        type="text" name="surname" value={surname} onChange={this.handlerChange} placeholder="Surname" />
                    <input className={`valid ${error.emailError ? 'error' : ''}`}
                        type="email" name="email" value={email} onChange={this.handlerChange} placeholder="Email" />
                    <div>
                        <label htmlFor="phoneNumber">
                        +374
                        </label>
                        <input className={`valid ${error.phoneError ? 'error' : ''}`} id="phoneNumber"
                        type="tel" name="phone" value={phone} onChange={this.handlerChange} placeholder="Phone" />
                    </div>
                    <input className={`valid ${error.businessNameError ? 'error' : ''}`}
                        type="text" name="businessName" value={businessName} onChange={this.handlerChange} placeholder="Business Name" />
                    <textarea name="note" value={note} onChange={this.handlerChange} placeholder="Some Notes"></textarea>
                </div>
                <div className="buttons">
                    <button className="btn" onClick={this.cancelRequest}>Cancel</button>
                    <button className="btn" disabled={disable} onClick={this.sendRerquest}>Add</button>
                </div>
            </div>
        )
    }
}

export default withRouter(DemoRequest);
import React , {Component} from 'react'
import csc from 'country-state-city'

export default class ContactInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            provinceList:[]
        }
    }
    
    render(){
    let countryList = csc.getAllCountries()
    
    const findState =(countryname) =>{
        if(countryname){
        let countryCode = csc.getAllCountries().filter(item => item.name === countryname)
        let code = countryCode[0].id
        const provinceList = csc.getStatesOfCountry(code)

        this.setState({
            provinceList
        })
        this.props.updateList('provinceList',provinceList)
        }
    }

    const handleChange = (e) =>{
        this.props.updateState(e)
    }

    var provinceList = this.state.provinceList
    if(this.props.inputInfo !==''){
        provinceList = this.props.inputInfo.provinceList
    }
    var province = provinceList.map(item=>{
        let isSelected = this.props.inputInfo.province === item.name ? true : false
        return(
            <option value={item.name} key={item.id} selected={isSelected}>{item.name}</option>
        )
    })
   

    var country = countryList.map(item=>{
        let isSelected = this.props.inputInfo.country === item.name ? true : false
        return (
            <option value={item.name} key={item.id} selected={isSelected}>{item.name}</option>
        )
    })
    return (
        <div className="contact-form">
        <form className="contact-information-form">
            <h3 className="contact-form-header">Contact information</h3>
            <div className="input-group-contact">
                <label className="label" htmlFor="email">Email or mobile phone number</label>
                <input name="email" type="email" id="email" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.email} required/>
                <div className="errormsg hidden">error</div>
            </div>
            <div className=" checkboxam">
                <input name="saveEmail" id="saveEmail" type="checkbox" onChange={(e)=>handleChange(e)} checked={this.props.inputInfo.saveEmail}/>
                <label className="label" htmlFor="saveEmail">Keep me up to date on news and exclusive offers</label>
            </div>
            <h3 className="contact-form-header">Shipping address</h3>
            <div className="input-group-flex">
                <div className="myflex">
                    <label className="label" htmlFor="firstname">First name(optional)</label>
                    <input name="firstname" type="text" id="firstname" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.firstname}/>
                </div>
                <div className="myflex">
                    <label className="label" htmlFor="lastname">Last name</label>
                    <input name="lastname" type="text" id="lastname" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.lastname} required/>
                    <div className="errormsg hidden">error</div>
                </div>
            </div>
            <div className="input-group-contact">
                <label className="label" htmlFor="address">Address</label>
                <input name="address" type="text" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.address} required/>
                <div className="errormsg hidden">error</div>
            </div>
            <div className="input-group-contact">
                <input name="suite" type="text" placeholder="Apartment, suite, etc. (optional)" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.suite}/>
            </div>
            <div className="input-group-contact">
                <input name="city" type="text" placeholder="City" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.city} required/>
                <div className="errormsg hidden">error</div>
            </div>
            <div className="input-group-flex">
                <div className="width50 input-group-contact selectdiv">
                    <select name="country" type="text" id="country" placeholder="Country/Reigen" required
                        onChange={(e)=>{
                        findState(e.target.value)
                        handleChange(e)}}>
                        <option value=''>Country</option>
                        {country}
                    </select>
                    <div className="errormsg hidden">error</div>
                </div>
                <div className="width50 input-group-contact selectdiv">
                    <select name="province" type="text" id="province" placeholder="province" required
                     onChange={(e)=>handleChange(e)}>
                        <option value=''>{this.props.inputInfo.country === 'United States' ?  'State' :  'Province'}</option>
                        {province}
                    </select>
                    <div className="errormsg hidden">error</div>
                </div>
                <div className="width50 input-group-contact">
                    <input name="postalcode" type="text" id="postalcode" placeholder="Postal code" onChange={(e)=>handleChange(e)} value={this.props.inputInfo.postalcode} required/>
                    <div className="errormsg hidden">error</div>
                </div>
            </div>
            <div className=" checkboxam">
                <input name="saveInfo" id="saveInfo" type="checkbox" onChange={(e)=>handleChange(e)} checked={this.props.inputInfo.saveInfo}/>
                <label className="label" htmlFor="saveInfo">Save this information for next time</label>
            </div>
        </form>
        </div>
    )
    }
}
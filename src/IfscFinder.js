import React, { Component } from 'react';
import './App.css';
import Result from './Result';

export class IfscFinder extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      bankName:'',
      uniqueBankList:[],
      stateList:[],
      uniqueStateList:[],
      districtList:[],
      uniqueDistrictList:[],
      branchList:[],
      uniqueBranchList:[],
      bank:'',
      state:'',
      district:'',
      branch:'',
      result:[],
      showResult:false,
      ifscData:this.props.ifscData,
      hideBank:false,
      hideState:false,
      hideDistrict:false,
      error:false,
      crossState:false,
      crossBank: false,
      crossDistrict: false
    }
  }
  componentDidMount(){
    this.calculateUniqueBankList()
  }

  render() {
    return <div>
      <div className="navbar"></div>
      {
          this.state.showResult ? <Result result={this.state.result[0]} parentCallback = {this.handleCallback} errorCallback = {this.handleErrorCallback}/>
          :<div className="container" id="box1">
              <h1>IFSC CODE FINDER</h1>
              <h3 id="bankName">{this.state.bankName}</h3>
              {this.state.error ?<h2 style={{color:"red"}}> DATA NOT FOUND</h2> :' '}
              <h4 id="display-error"></h4>
              <table className="table">
                  <tbody>
                        <tr>
                            <td><label htmlFor="bank">Select Your Bank</label></td>
                            {this.state.hideBank ? 
                                <td>
                                <select id="bank" onChange={(e)=>this.handleBankChange(e)} disabled={true}>
                                    <option value="Choose Bank">Choose Bank</option>
                                    {this.state.uniqueBankList.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                                </select>
                            </td>:  <td>
                                <select id="bank" onChange={(e)=>this.handleBankChange(e)}>
                                    <option value="Choose Bank">Choose Bank</option>
                                    {this.state.uniqueBankList.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                                </select>
                            </td>
                            }
                            {this.state.crossBank ? <td id="cross" onClick={(e)=>this.handleCrossBankClick(e)} >X</td>:''}
                        </tr>
                    <tr>
                        <td><label htmlFor="state">State in which bank is situated</label></td>
                        {this.state.hideState ? 
                            <td>
                            <select id="state" onChange={(e)=>this.handleStateChange(e)} disabled={true}>
                                <option value="Choose State">Choose State</option>
                                {this.state.uniqueStateList.map(state => <option key={state} value={state}>{state}</option>)}
                            </select>
                        </td>:
                        <td>
                            <select id="state" onChange={(e)=>this.handleStateChange(e)}>
                                <option value="Choose State">Choose State</option>
                                {this.state.uniqueStateList.map(state => <option key={state} value={state}>{state}</option>)}
                            </select>
                        </td>
                        }
                        {this.state.crossState ? <td id="cross" onClick={(e)=>this.handleCrossStateClick(e)}>X</td>:''}
                    </tr>
                    <tr>
                        <td><label htmlFor="district">District in which bank is situated</label></td>
                            {this.state.hideDistrict ? 
                        <td>
                            <select id="district" onChange={(e)=>this.handleDistrictChange(e)} disabled={true}>
                                <option value="Choose District">Choose District</option>
                                {this.state.uniqueDistrictList.map(district => <option key={district} value={district}>{district}</option>)}
                            </select>
                        </td>
                        :
                        <td>
                            <select id="district" onChange={(e)=>this.handleDistrictChange(e)}>
                                <option value="Choose District">Choose District</option>
                                {this.state.uniqueDistrictList.map(district => <option key={district} value={district}>{district}</option>)}
                            </select>
                        </td>
                        }
                        {this.state.crossDistrict ? <td id="cross" onClick={()=>this.setState({hideDistrict:!this.state.hideDistrict,uniqueBranchList:[],crossDistrict:!this.state.crossDistrict})}>X</td>:''}
                    </tr>
                      <tr>
                          <td><label htmlFor="branch">Branch of Bank within District</label></td>
                          <td>
                              <select id="branch" onChange={(e)=>this.handleBranchChange(e)}>
                                  <option value="Choose Branch">Choose Branch</option>
                                  {this.state.uniqueBranchList.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                              </select>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <button id="next" onClick={(e)=>this.handleNextClick(e)}>Next</button>
          </div>
      }
    </div>;
  }

  handleCallback = (e) => {
      this.setState({showResult:e,hideBank:false,hideDistrict:false,hideState:false,crossBank:false,crossDistrict:false,crossState:false})
  }
  filterListByBank = (bank) => this.state.ifscData.filter((item) => item.BANK === bank)

  filterListByBankAndState = (bank, state) => this.state.ifscData.filter((item) => item.BANK === bank && item.STATE === state)

  filterListByBankAndStateAndDistrict = (bank, state, district) => this.state.ifscData.filter((item) => item.BANK === bank && item.STATE === state && item.DISTRICT === district)

  filterListByBankAndStateAndDistrictAndBranch = (bank, state, district, branch) => this.state.ifscData.filter((item) => item.BANK === bank && item.STATE === state && item.DISTRICT === district && item.BRANCH === branch)

  calculateUniqueBankList = () => {
      const fullBankList = this.state.ifscData.map((item) => item.BANK)
      const bankSet = new Set(fullBankList)

      const arr=Array.from(bankSet);
      this.setState({uniqueBankList:arr})
  }

  calculateUniqueStateList = () => {
      const fullStateList = this.state.stateList.map((item) => item.STATE)
      const stateSet = new Set(fullStateList)

      const arr=Array.from(stateSet);
      this.setState({uniqueStateList:arr})
  }

  calculateUniqueDistrictList = () => {
      const fullDistrictList = this.state.districtList.map((item) => item.DISTRICT)
      const districtSet = new Set(fullDistrictList)

      const arr=Array.from(districtSet);
      this.setState({uniqueDistrictList:arr})
  }

  calculateUniqueBranchList = () => {
      const fullBranchList = this.state.branchList.map((item) => item.BRANCH)
      const branchSet = new Set(fullBranchList)

      const arr=Array.from(branchSet);
      this.setState({uniqueBranchList:arr})
  }

  handleBankChange= async (e)=>{
      const stateList= await this.filterListByBank(e.target.value)
      this.setState({bank:e.target.value,bankName:e.target.value})
      this.setState({stateList})
      this.calculateUniqueStateList()
  }

  handleStateChange = async (e) => {
      const districtList = await this.filterListByBankAndState(this.state.bank, e.target.value)
      this.setState({districtList,state:e.target.value})
      this.calculateUniqueDistrictList()
      this.setState({hideBank:true,hideState:true,crossBank:true,crossState:true})
  }

  handleDistrictChange = async (e) => {
      const branchList = await this.filterListByBankAndStateAndDistrict(this.state.bank, this.state.state, e.target.value)
      this.setState({branchList,district:e.target.value})
      this.calculateUniqueBranchList()
      this.setState({hideDistrict:true,crossDistrict:true})
  }

  handleBranchChange = async (e) => {
      const result = await this.filterListByBankAndStateAndDistrictAndBranch(this.state.bank, this.state.state, this.state.district, e.target.value)
      this.setState({result,branch:e.target.value})
  
      console.log(this.state.result)
  }
  handleNextClick = () => {
    this.setState({showResult:true})
  }

  handleCrossStateClick = () =>{
    if(this.state.crossState){
        this.setState({crossState:false,crossDistrict:false})
    }
      this.setState({hideBank:true,hideState:!this.state.hideState,uniqueDistrictList:[],hideDistrict:false,uniqueBranchList:[]})
  }
  handleCrossBankClick = () =>{
        if(this.state.crossBank){
            this.setState({crossBank:false,crossState:false,crossDistrict:false})
        }
        if(this.state.hideBank){
            this.setState({hideBank:false,uniqueStateList:[],hideState:false,uniqueDistrictList:[],hideDistrict:false,uniqueBranchList:[]})
        }
  }
    handleErrorCallback = (e) => {
        this.setState({error:e})
    }
}

export default IfscFinder;

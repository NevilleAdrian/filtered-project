import React, { Component } from "react";
import axios from "axios";
import api from "../apis/api";
import "./filter.css";
// import Loader from 'react-loader-spinner'
import LoadingProgress from 'react-js-loading-progress-bar';
import fil from "../helper/filtered";

export default class filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      data: [],
      filterData: [],
      page: 1
    };
  }

  async receivedData() {
    await axios.get('https://serene-badlands-03855.herokuapp.com/api/filters').then((res) => {
      const data = res.data;
      console.log({ data })
      this.setState({ data: data, filterData: data });

    });
  }



  async receivedFilter() {
    const projectData = await api.getAll(
      "https://ven10.co/assessment/filter.json"
    );
    console.log(projectData);
    this.setState({ postData: projectData });
  }

  componentDidMount() {
    this.receivedData();
    this.receivedFilter();
  }


  filterList(a) {
    const newData = fil.filtered(this.state.data, a);
    this.setState({ ...this.state, filterData: newData })

  }

  showMore() {
    this.setState({ ...this.state, page: this.state.page++ });
  }



  render() {
    console.log(this.state.filterData)
    return (
      <>
        {this.state.data.length ?
          <div style={{ backgroundColor: "#ccc" }}>
            <h3 className="filter-text">Filter</h3>
            {this.state.filterData.length === 0 &&
          <div className="center">
            <p>Your Filtered list is empty</p>
          </div>
          
          }           
            {this.state.postData
              .sort()
              .map((data) => (
                <>
                  <div className="container box" style={{ backgroundColor: "#fff", marginBottom: "20px" }}>
                    <button className="box-button" style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.filterList(data, true)}>
                      <div className="col-md-12">
                        <div class="card" style={{ marginBottom: "20px" }}>
                          <div class="card-body">
                            <h2 style={{ fontWeight: "bold" }} className="center">
                              {data.start_year} - {data.end_year}
                            </h2>
                            <h5 className="center">{data.gender}</h5>
                            <div className="container">
                              <div className="row " style={{ paddingTop: "1%" }}>
                                {data.countries.map((country, j) => (
                                  <span className="country-background" key={j}>{country}</span>
                                ))}
                              </div>
                            </div>
                            <div className="container">
                              <div className="row ">


                                {data.colors.map((color, j) => (
                                  <span style={{ backgroundColor: color }} className="dot center" key={j}></span>

                                ))}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                </>
              ))}

            {this.state.filterData
              .slice(100 * this.state.page - 100, 100 * this.state.page)
              .sort()
              .map(({ first_name, last_name, email, country, car_model, car_model_year, car_color, gender, job_title, bio }) => (
                <>
                  <div className="container box" style={{ backgroundColor: "#fff", marginBottom: "20px" }}>
                    <div className="col-md-12">
                      <div class="card" style={{ marginBottom: "20px" }}>
                        <div class="card-body">
                          <div className="col-md-4">
                            <img className="car" src="images/car.jpg" />
                          </div>
                          <div className="col-md-8">
                            <h3 style={{ color: "#000" }}>{first_name === "NaN" ? "" : first_name} {last_name === "NaN" ? "" : last_name}</h3>
                            <div style={{ paddingLeft: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center">Brand</span>
                              <span style={{ paddingRight: "20px" }} className="center">Year</span>
                              <span style={{ paddingRight: "20px" }} className="center">Color</span>
                            </div>
                            <div style={{ paddingLeft: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center">{car_model}</span>
                              <span style={{ paddingRight: "20px" }} className="center">{car_model_year}</span>
                              <span style={{ backgroundColor: car_color, paddingRight: "20px" }} className="dot-2 center"></span>
                            </div>

                            <div style={{ paddingLeft: "15px", paddingTop: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center">Country</span>
                              <span style={{ paddingRight: "20px" }} className="center">Gender</span>
                              <span style={{ paddingRight: "20px" }} className="center">Job</span>
                            </div>
                            <div style={{ paddingLeft: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center">{country}</span>
                              <span style={{ paddingRight: "20px" }} className="center">{gender}</span>
                              <span style={{ paddingRight: "20px" }} className="center">{job_title}</span>
                            </div>

                            <div style={{ paddingLeft: "15px", paddingTop: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center"><span >Email:</span>{email}</span>
                            </div>

                            <div style={{ paddingLeft: "15px", paddingTop: "15px" }} className="row">
                              <span style={{ paddingRight: "20px" }} className="center"><span >Bio:</span>{bio}</span>
                            </div>



                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>
              ))}

          
            {[...Array(Math.floor(this.state.filterData.length / 100)).keys()].map(i =>
              <button type="button" onClick={() => this.setState({ ...this.state, page: i + 1 })}>{i + 1}</button>)}
          </div>
          :
          <div style={{ textAlign: "center", position: "absolute", top: "50%", left: "30%" }} className>
            <LoadingProgress
              useSpinner
              active={true}
              total={this.state.total}
              current={this.state.current}
            />
          </div>
        }
      

      </>
    );
  }
}



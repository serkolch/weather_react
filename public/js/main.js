var WeatherTable = React.createClass({
  getInitialState: function(){
    return ({
      currentWeather: null,
      location: []
    })
  },
  getWeatherData: function(zip){
    $.ajax({
      url: `/getweather/${zip}`,
      method: 'get',
      success: function(data){
        this.handleWeatherData(data,zip);
      }.bind(this)
    })
  },
  handleWeatherData: function(data,zip){
    this.setState({
      currentWeather: {
        weather: data, 
        zip: zip
      }
    });
  },
  handleLocation: function(data){
    this.setState({location: data})
  },
  render: function(){
    return(
      <div>
        <SearchBar 
          getData={ this.getWeatherData }
        />
        <LocationDisplay
          locations={ this.state.location }
          getData={ this.getWeatherData }
        />
        <CurrentWeather 
          weather={ this.state.currentWeather }
          locationChange={ this.handleLocation } 
          location={ this.state.location }
        />
      </div>
    )
  }
});



var SearchBar = React.createClass({
  getInitialState: function(){
    return ({
      searchText: ''
    })
  },
  handleInputChange: function(e){
    this.setState({ searchText: e.target.value });
  },
  handleSubmit: function(e){
    e.preventDefault();
    var zip = this.state.searchText.trim();
    this.props.getData(zip);
  },
  render: function(){
    return(
      <div className="search-bar">
        <form 
          className="input-group input-group-lg"
          onSubmit={ this.handleSubmit }
        >
          <input onChange={ this.handleInputChange } className="form-control" />
          <span className="input-group-btn">
            <button 
              type="submit" 
              className="search-button btn btn-lg btn-default">
            Search
            </button>
          </span>
        </form>

      {
        // This is how you comment
        // Needs to be wrapped in curly braces
      }
      </div>
    )
  }
})

var CurrentWeather = React.createClass({
  handleClick: function(data){
    this.props.location.push(data);
    var newLocation = this.props.location;
    this.props.locationChange(newLocation);
  },
  render: function(){
    var self = this;
    var callback = function(){
      self.handleClick(data);
    }

    var data = this.props.weather

    if ( data == null ){
      return(
        null
      )
    }

    return(
      <div className="thumbnail">
        <WeatherPin 
          key={ data.weather.zip }
          name={ data.weather.name }
          currentTemp={ data.weather.main.temp }
          desc={ data.weather.weather[0].description }
          maxTemp={ data.weather.main.temp_max }
          minTemp={ data.weather.main.temp_min } 
        />
        <button
          type="submit"
          className="search-button btn btn-lg btn-default"
          onClick={ callback }>
          Add
        </button>
      </div>
    )
  }
})

var WeatherPin = React.createClass({
  render: function(){
    return(
      <div>
        <h1>{this.props.name}</h1>
        <h2>{this.props.currentTemp}</h2>
        <h2>{this.props.desc}</h2>
        <h3>Min</h3>
        <h4>{this.props.minTemp}</h4>
        <h3>Max</h3>
        <h4>{this.props.maxTemp}</h4>
      </div>
    )
  }
})

var LocationDisplay = React.createClass({
  handleClick: function(data){
    console.log(data);
    this.props.getData(data.zip);
  },
  render: function(){
    var self = this;
    var locations = this.props.locations.map(function(location){
      var callback = function(){
        self.handleClick(location);
      }
      return(
        <li
          key={ location.weather.id }
          onClick={ callback }
          className="location"
        >{ location.weather.name }</li>
      )
    })
    return(
      <div>
        <ul className="location-list">
          { locations }
        </ul>
      </div>
    )
  }
})










ReactDOM.render(<WeatherTable/>,document.getElementById('container-fluid'));
import React, { useEffect } from 'react';
import { Grid, Form, } from 'semantic-ui-react';


const Range = () => {

    // useEffect(() => {
    //     const onGeoLocation = async () => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(function (position) {
    //                 setLat(position.coords.latitude);
    //                 setLon(position.coords.longitude);

    //             });
    //         } else {
    //             alert("🙁🙁🙁Sorry!!! Your Browser Doesn't Support Geolocation🙁🙁🙁");
    //         }

    //         const request = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY_WEATHER}`);
    //         setFullData(request.data);
    //         setFourDaysData(request.data.list.slice(8, 40).filter(item => item.dt_txt.includes("12:00:00")));
    //         setFirstDayData(request.data.list[1]);
    //         setIsLoading(false);

    //         // setResults(request.data.city.name);

    //         return request;
    //     }
    //     onGeoLocation();
    // }, [lat, lon]);
    return (
        <div>
            <Grid>
                <span>Near me</span>
                <Form.Input
                    // label={`Duration: ${duration}ms `}
                    min={100}
                    max={2000}
                    name='duration'
                    // onChange={handleChange}
                    step={100}
                    type='range'
                // value={duration}
                />
                <span>High rated</span>
            </Grid>
        </div>
    );
};

export default Range;
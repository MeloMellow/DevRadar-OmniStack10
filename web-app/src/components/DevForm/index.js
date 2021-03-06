import React, {useState, useEffect} from 'react';

import './style.css';

function DevForm({onSubmit}){

    const [github_username, setGihubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
          const { latitude, longitude} = pos.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },(err)=>{
          console.log(err);
        },{
          timeout: 30000
        });
    }, []);//[] is the dependencies

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGihubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Github User</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e => setGihubUsername(e.target.value)} />
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologies</label>
            <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="text" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>
            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="text" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>
            </div>      
            
            <button type="submit">Save</button>
        </form>
    );
}

export default DevForm;
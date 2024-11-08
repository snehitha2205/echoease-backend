// ApplianceCard.js
import React from 'react';
import './ApplianceCard.css';

const ApplianceCard = ({ appliance, onToggle }) => {
  return (
    <div className="col-md-6 col-md-12 mb-3"> {/* Added margin-bottom for spacing */}
      <div className="card position-relative">
        <img src={appliance.image} className="card-img-top" alt={appliance.name} />
        
        <div className="card-body">
          <h5 className="card-title">{appliance.name}</h5>
          
          <div className="form-check form-switch mb-2"> {/* Added margin-bottom for spacing */}
            <input
              className="form-check-input"
              type="checkbox"
              id={`${appliance.name.replace(/\s+/g, '')}Switch`}
              checked={appliance.status}
              onChange={() => onToggle(appliance.id)}
            />
            <label className="form-check-label" htmlFor={`${appliance.name.replace(/\s+/g, '')}Switch`}>
              Turn ON/OFF
            </label>
          </div>
          
          <p className="card-text">
            Status: 
            <span className="status-badge">
              <span className={`badge ${appliance.status ? 'bg-success' : 'bg-danger'}`}>
                {appliance.status ? 'On' : 'Off'}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplianceCard;

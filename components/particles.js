import React from "react";
import Particles from "react-particles-js";

const ParticlesComponent = props => (
  <div data-aos="zoom-in"   style={{ zIndex: -98 }}>
    <Particles
      {...props}
      style={{ position: "absolute", top: 0, zIndex: -99 }}
      params={{
        particles: {
          number: {
            value: 30
          },
          "move":{
              "speed": 2,
              "direction": "none",
              "out_mode": "bounce",
              "bounce": false
          }
        },
      }}
    />
  </div>
);

export default ParticlesComponent;

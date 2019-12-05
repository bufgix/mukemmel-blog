import React from "react";
import Particles from "react-particles-js";

const ParticlesComponent = () => (
  <Particles
    style={{ position: "absolute", top: 0 }}
    params={{
      particles: {
        number: {
          value: 30
        }
      }
    }}
  />
);

export default ParticlesComponent;

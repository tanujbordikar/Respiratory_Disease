import React from "react";

const About = (props) => {
  return (
    <div style={{ position: "absolute", marginTop: "75px", fontSize: "20px" }}>
      About {props.name}!
    </div>
  );
};

export default About;

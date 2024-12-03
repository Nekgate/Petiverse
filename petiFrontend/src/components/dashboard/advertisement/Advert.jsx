import React from "react";
import { FiEdit3 } from "react-icons/fi";
import "../../../components/dashboard/advertisement/Advert.css"

function Advert() {
  return <div className="advert-background">
      <div className="advert-inner">
        <div className="advert-top">
          <div className="ad-edit-lang">
            <h3>Preferred language</h3>
            <FiEdit3 />
          </div>
          <p>British English</p>
          <hr />
        </div>
        <div className="Ad-Advert">
          <h3>Advertisments</h3>
          <h5>
            Puppy Pets store now opening @ zundi fisher zone 30 3rd December
            2024
          </h5>
          <div className="advert-img1">
            <img src="/Images/advert1.png" alt="Logo" />
          </div>
          <a href="https://tatrck.com/9z7K3hGCLg">see more</a>
          <hr />
        </div>
        <div className="Ad-Advert2">
          <h5>Cap stone medical center!!!</h5>
          <p>Bring in your pets to vets for medical check up</p>
          <div className="advert-img2">
            <img src="/Images/advert2.png" alt="Logo" />
          </div>
          <a href="https://tatrck.com/9z7K3hGCLg">see more</a>
          <hr />
        </div>
      </div>
    </div>;
}

export default Advert;

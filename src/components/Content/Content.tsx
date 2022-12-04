import "./Content.scss"
import { useNavigate } from "react-router-dom"
import PartsLogo from "../../assets/img/Dirt-Bike-Parts.jpg"

export const Content = () => {
  const history = useNavigate()

  return (
    <div className="content">
      <div className="products" onClick={() => history("parts")}>
        <div className="products__item">
          <h4 className="item__title">Parts:</h4>
          <div className="item__content body">
            <div className="body__logo">
              <img src={PartsLogo} alt="Parts" />
            </div>
            <div className="body__text">
              <span className="body__text__item">Honda</span>
              <span className="body__text__item">Kawasaki</span>
              <span className="body__text__item">KTM</span>
              <span className="body__text__item">Suzuki</span>
              <span className="body__text__item">Yamaha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

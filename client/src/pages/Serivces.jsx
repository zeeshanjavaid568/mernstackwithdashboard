import { useAuth } from "../store/auth";

const Serivces = () => {
  const { services } = useAuth();

  return (
    <>
      <section className="section-serices">
        <div className="container">
          <h1 className="main-heading"> Services </h1>
        </div>

        <div className="container grid grid-three-cols">
          {services.map((curElem, index) => {
            const { provider, price, service, description } = curElem;
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/image/home-page.jpg" width={400} alt="" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p> {provider} </p>
                    <p> {price}</p>
                  </div>

                  <h2 style={{ margin: "11px 0" }}> {service} </h2>
                  <p> {description} </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Serivces;
